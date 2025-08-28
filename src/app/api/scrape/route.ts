import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export interface TableInfo {
  name: string;
  rows: number;
  cols: number;
  data: any[];
}

export interface ScrapeResult {
  pageTitle: string;
  tables: TableInfo[];
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url } = body;

    if (!url || !url.includes('wikipedia.org')) {
      return NextResponse.json({ error: 'Invalid Wikipedia URL.' }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch page. Status: ${response.status}` },
        { status: 500 }
      );
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    const pageTitle = $('#firstHeading').text().trim().replace(/[\/\\?%*:|"<>]/g, '-');

    if (!pageTitle) {
      return NextResponse.json(
        { error: 'Page title not found.' },
        { status: 404 }
      );
    }

    const extractedTables: TableInfo[] = [];

    $('table.wikitable').each((index, element) => {
      const tableElement = $(element);
      const tableName = tableElement.find('caption').text().trim() || `Table ${index + 1}`;

      const tableData: any[] = [];
      const headers: string[] = [];

      tableElement.find('tr:first-child th').each((i, th) => {
        headers[i] = $(th).text().trim();
      });

      if (headers.length === 0) return;

      tableElement.find('tr').slice(1).each((i, row) => {
        const rowData: { [key: string]: string } = {};
        $(row).find('td').each((j, cell) => {
          if (headers[j]) {
            rowData[headers[j]] = $(cell).text().trim();
          }
        });
        if (Object.keys(rowData).length > 0) {
          tableData.push(rowData);
        }
      });

      if (tableData.length > 0) {
        extractedTables.push({
          name: tableName,
          rows: tableData.length,
          cols: headers.length,
          data: tableData,
        });
      }
    });

    if (extractedTables.length === 0) {
      return NextResponse.json(
        { error: 'No tables (.wikitable) found on this page.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ pageTitle, tables: extractedTables });

  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: `Internal server error: ${err.message}` },
      { status: 500 }
    );
  }
}

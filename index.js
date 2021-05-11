'use strict';

const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();
const datasetId = 'ruuvi_dataset';
const tableId = 'ruuvi_data_table';

exports.eventData = async (event, context) => {

  let data = event['data']
  if( data ) {
    let payload = JSON.parse(Buffer.from(data, 'base64').toString())
    console.log(`Data: ${JSON.stringify(payload)}`)
    delete payload['data_format']

    payload['created'] = new Date().toISOString()

    let rows = [payload]
    try {
      await bigquery
      .dataset(datasetId)
      .table(tableId)
      .insert(rows);
      console.log(`Inserted ${rows.length} rows`);
    } catch(err) {
      console.log(`Error: ${JSON.stringify(err)}`)
    }

    
  } else {

    console.log(`Data not found in ${JSON.stringify(event)}`)
  }
};




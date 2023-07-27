import easyinvoice from 'easyinvoice'

const downloadInvoice = async (order) => {
  var data = {
    // Customize enables you to provide your own templates
    // Please review the documentation for instructions and examples
    "customize": {
      //  "template": fs.readFileSync('template.html', 'base64') // Must be base64 encoded html 
    },
    "images": {
      // The logo on top of your invoice
      // "logo": "https://public.easyinvoice.cloud/img/logo_en_original.png",
      // // The invoice background
      // "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
    },
    // Your own data

    "sender": {
      "company": order.dealerName,
      "address": "Sample Street 123",
      "zip": "1234 AB",
      "city": "Sampletown",
      "country": "Samplecountry"
      //"custom1": "custom value 1",
      //"custom2": "custom value 2",
      //"custom3": "custom value 3"
    },
    // Your recipient
    "client": {
      "company": order.customerName,
      "address": "Clientstreet 456",
      "zip": "4567 CD",
      "city": "Clientcity",
      "country": "Clientcountry"
      // "custom1": "custom value 1",
      // "custom2": "custom value 2",
      // "custom3": "custom value 3"
    },
    "information": {
      // Invoice number
      "number": order.orderId,
      // Invoice data
      "date": order.orderDate,
      // Invoice due date
      "due-date": order.orderDate
    },
    // The products you would like to see on your invoice
    // Total values are being calculated automatically

    "products":
      order.modalData.map((item) => {
        return (
          {
            "quantity": item.itemQuantity,
            "description": item.itemName,
            "tax-rate": 0,
            "price": item.rate
          }
        )
      })
    ,
    // Settings to customize your invoice
    "settings": {
      "currency": "USD", // See documentation 'Locales and Currency' for more info. Leave empty for no currency.
      // "locale": "nl-NL", // Defaults to en-US, used for number formatting (See documentation 'Locales and Currency')        
      // "margin-top": 25, // Defaults to '25'
      // "margin-right": 25, // Defaults to '25'
      // "margin-left": 25, // Defaults to '25'
      // "margin-bottom": 25, // Defaults to '25'
      // "format": "A4", // Defaults to A4, options: A3, A4, A5, Legal, Letter, Tabloid
      // "height": "1000px", // allowed units: mm, cm, in, px
      // "width": "500px", // allowed units: mm, cm, in, px
      // "orientation": "landscape", // portrait or landscape, defaults to portrait
    },
    // Translate your invoice to your preferred language
    "translate": {
      // "invoice": "FACTUUR",  // Default to 'INVOICE'
      // "number": "Nummer", // Defaults to 'Number'
      // "date": "Datum", // Default to 'Date'
      // "due-date": "Verloopdatum", // Defaults to 'Due Date'
      // "subtotal": "Subtotaal", // Defaults to 'Subtotal'
      // "products": "Producten", // Defaults to 'Products'
      // "quantity": "Aantal", // Default to 'Quantity'
      // "price": "Prijs", // Defaults to 'Price'
      // "product-total": "Totaal", // Defaults to 'Total'
      // "total": "Totaal", // Defaults to 'Total'
      // "vat": "btw" // Defaults to 'vat'
    },
  };

  //Create your invoice! Easy!
  try {
    const result = await easyinvoice.createInvoice(data);
    easyinvoice.download('Invoice.pdf', result.pdf);
  } catch (err) { console.log(err) }

}

export default downloadInvoice
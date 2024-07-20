import JobModel from "../model/job_model.js";
import html_to_pdf from "html-pdf-node";
import { generatePdf } from "html-pdf-node";
import { Readable } from "stream";
import { createReadStream } from "fs";
import { join } from "path";
// import logo from "../utils/images/Logo.png"
// const logo = `/static/images/Logo.png`;

// const logo = `/static/Logo.png`;




const options = { format: "A4" };

export const test = (req, res) => {
  res.json({
    message: "APi route is working !",
  });
};

export const createJob = async (req, res, next) => {
  const newJob = new JobModel(req.body);
  try {
    const jobSaved = await newJob.save();
    res.status(200).json(jobSaved);
  } catch (error) {
    next(error);
  }
};

export const getAllData = async (req, res, next) => {
  try {
    const getAll = await JobModel.find().sort({ createdAt: -1 });
    res.status(200).json(getAll);
  } catch (error) {
    next(error);
  }
};

export const deleteItem = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const itemToDelete = await JobModel.findByIdAndDelete(itemId);

    if (!itemToDelete) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Item deleted successfully",
      deletedItem: itemToDelete,
    });
  } catch (error) {
    next(error);
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const GetSingleItem = async (req, res, next) => {
  try {
    const itemId = req.params.id;

    // Retrieve the single item based on its ID
    const singleItem = await JobModel.findById(itemId);

    if (!singleItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({
      message: "Item retrieved successfully",
      singleItem: singleItem,
    });
  } catch (error) {
    next(error);
    console.error(error);
    next(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const EditSingleItem = async (req, res, next) => {
  try {
    const itemId = req.params.id; // Corrected from req.params.itemId to req.params.id
    const updatedData = req.body;

    // Your validation or additional logic here

    // Update the item in the database
    const updatedItem = await JobModel.findByIdAndUpdate(itemId, updatedData, {
      new: true,
    });

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Send the updated item as a response
    res.status(200).json({ message: "Item updated successfully", updatedItem });
  } catch (error) {
    next(error);
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkUser = async (req, res, next) => {
  try {
    const { number } = req.params;
    const user = await JobModel.findOne({ number: number });
    if (user) {
      return res.json({ success: true, user });
    }
    res.json({ success: true, message: "User not found" });
  } catch (error) {
    console.error("Error in checkUser:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getInvoice = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const itemTofind = await JobModel.findById(itemId);
    console.log(itemTofind);
    if (!itemTofind) {
      return res.status(404).json({ error: "Item not found" });
    }
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;
    // Your logic to fetch invoice data based on the provided ID
    const invoiceData = {
      // ... fetch invoice data based on req.params.id
      customerName: itemTofind?.username,
      customerAddress: itemTofind?.address,
      customerOrderNo: itemTofind?.jobsheetno,
      customerNumber: itemTofind?.number,
      customerBrand: itemTofind?.brand,
      customerModel: itemTofind?.model,
      customerCategory: itemTofind?.category,
      customerPrice: itemTofind?.price,
      currentdate: formattedDate,
    };

    const logoUrl = '/static/images/Logo.png';

    // Replace the following HTML content with your actual invoice template

    const htmlContent1 = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Invoice</title>
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:ital,wght@0,300;0,400;0,700;1,400&display=swap" rel="stylesheet">
        <style>
            body {
                font-family: 'Roboto Condensed', sans-serif;
            }
  
    
            .border {
                background-color: white;
                width: 19cm;
                margin-left: 1cm;
                margin-top: 1cm;
                margin-bottom: 1cm;
                border-color: teal;
                border-width: 1px;
                border-style: solid;
            }
    
            .parent-border {
                background-color: white;
                width: 21cm;
                height: auto;
                border-color: teal;
                border-width: 1px;
                border-style: solid;
            }
    
            .table-row-border > th {
                border-left-color: white;
                border-right-color: white;
                border-bottom-color: teal;
                border-top-color: teal;
                border-width: 2px;
                border-style: solid;
                margin: 0;
                padding: 0;
                width: 4cm;
                height: 1cm;
                text-align: center;
                color: teal;
            }
    
            td {
                height: 1cm;
                text-align: center;
            }
    
            .table-addresses > th {
                color: teal;
                text-align: center;
                width: 4cm;
                text-align: left;
            }
    
            table.invoice-table-address {
                margin-left: 1cm;
            }
    
            table.invoice-table-address td {
                font-size: 15px;
                text-align: left;
                height: 0.5cm;
            }
    
            .parent {
                position: relative;
            }
    
            .child {
                position: absolute;
            }
    
            .invoice-table {
                margin-left: 1cm;
                margin-right: 1cm;
            }
    
            .parent-invoice-logo-type {
                height: 3cm;
            }
    
            .parent-invoice-table-address {
                margin-top: 1cm;
                height: 4cm;
            }
    
            .parent-invoice-table {
                margin-top: 1cm;
            }
    
            .parent-invoice-total {
                margin-top: 1cm;
                height: 1cm;
            }
    
            .parent-invoice-terms {
                margin-top: 4cm;
                height: 5cm;
            }
    
            .invoice-type {
                font-size: 50px;
                font-weight: 700;
                color: teal;
                left: 1cm;
                bottom: 0cm;
            }
    
            .invoice-logo {
                right: 1cm;
                bottom: 0cm;
            }
    
            .invoice-total-text {
                font-size: 30px;
                font-weight: 700;
                color: teal;
                left: 1cm;
                bottom: 0cm;
            }
    
            .invoice-total {
                right: 1cm;
                bottom: 0cm;
                font-size: 30px;
                font-weight: 700;
            }
    
            .invoice-terms {
                left: 1cm;
                bottom: 0cm;
            }
        </style>
    </head>
    <body>
        <div class="parent-border">
            <div class="border">
                <div class="parent parent-invoice-logo-type">
                    <span class="invoice-type child">INVOICE</span>
                    <img class="invoice-logo child" src="${logoUrl}" alt="" width="100" height="100">
                </div>
                <div class="parent parent-invoice-table-address">
                    <table class="child invoice-table-address" style="border-spacing: 0;">
                        <tr class="table-addresses">
                            <th>FROM</th>
                            <th>BILL TO</th>
                            <th>SHIP TO</th>
                            <th>INVOICE</th>
                        </tr>
                        <tr class="temp">
                            <td>M-Tech </td>
                            <td> ${invoiceData.customerName}</td>
                            <td>JARSH COMPLEX</td>
                            <td>INVOICE</td>
                        </tr>
                        <tr>
                            <td>H.No: 18-A-37WP</td>
                            <td>H.No: 13-26/4</td>
                            <td>H.No: 13-26/4</td>
                            <td>Invoice number: ${invoiceData.customerOrderNo}</td>
                        </tr>
                        <tr>
                            <td>Hyderabad </td>
                            <td>Mumbai</td>
                            <td>Mumbai</td>
                            <td>Date: ${formattedDate}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </table>
                </div>
                <div class="parent parent-invoice-table">
                    <table class="invoice-table" style="border-spacing: 0;">
                        <tr class="table-row-border">
                            <th>ITEM</th>
                            <th>BRAND</th>
                            <th>CATEGORY</th>
                          
                           
                            <th>PRICE</th>
                        </tr>
                        <tr>
                            <td>${invoiceData?.customerModel}</td>
                            <td>${invoiceData?.customerBrand}</td>
                            <td>${invoiceData?.customerCategory}</td>
                           
                          
                            <td>₹ : ${invoiceData?.customerPrice}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            
                          
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                           
                        
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                           
                          
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                           
                          
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                          
                          
                            <td></td>
                        </tr>
                    </table>
                </div>
                <div class="parent parent-invoice-total">
                    <span class="invoice-total-text child">TOTAL :</span>
                    <span class="invoice-total child">RS: ${invoiceData?.customerPrice}/-</span>
                </div>
                <div class="parent parent-invoice-terms">
                    <div class="child invoice-terms">
                        <h4>TERMS AND CONDITIONS</h4>
                        <p>Payment is due within 15 days</p>
                        <p>State bank of india</p>
                        <p>Account number: XXXXXX123565</p>
                        <p>IFSC: 000345432</p>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

    const htmlContent = `
   
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title> Order confirmation </title>
<meta name="robots" content="noindex,nofollow" />
<meta name="viewport" content="width=device-width; initial-scale=1.0;" />
<style type="text/css">
  @import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);
  body { margin: 0; padding: 0; background: #e1e1e1; }
  div, p, a, li, td { -webkit-text-size-adjust: none; }
  .ReadMsgBody { width: 100%; background-color: #ffffff; }
  .ExternalClass { width: 100%; background-color: #ffffff; }
  body { width: 100%; height: 100%; background-color: #e1e1e1; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
  html { width: 100%; }
  p { padding: 0 !important; margin-top: 0 !important; margin-right: 0 !important; margin-bottom: 0 !important; margin-left: 0 !important; }
  .visibleMobile { display: none; }
  .hiddenMobile { display: block; }

  @media only screen and (max-width: 600px) {
  body { width: auto !important; }
  table[class=fullTable] { width: 96% !important; clear: both; }
  table[class=fullPadding] { width: 85% !important; clear: both; }
  table[class=col] { width: 45% !important; }
  .erase { display: none; }
  }

  @media only screen and (max-width: 420px) {
  table[class=fullTable] { width: 100% !important; clear: both; }
  table[class=fullPadding] { width: 85% !important; clear: both; }
  table[class=col] { width: 100% !important; clear: both; }
  table[class=col] td { text-align: left !important; }
  .erase { display: none; font-size: 0; max-height: 0; line-height: 0; padding: 0; }
  .visibleMobile { display: block !important; }
  .hiddenMobile { display: none !important; }
  }
</style>


<!-- Header -->
<table  width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
  <tr>
    <td height="20"></td>
  </tr>
  <tr>
    <td>
      <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff" style="border-radius: 10px 10px 0 0;">
        <tr class="hiddenMobile">
          <td height="40"></td>
        </tr>
        <tr class="visibleMobile">
          <td height="30"></td>
        </tr>

        <tr>
          <td>
            <table  width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
              <tbody>
                <tr>
                  <td>
                    <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
                      <tbody>
                        <tr>
                          <td align="left"> <img src="http://www.supah.it/dribbble/017/logo.png" width="32" height="32" alt="logo" border="0" /></td>
                        </tr>
                        <tr class="hiddenMobile">
                          <td height="40"></td>
                        </tr>
                        <tr class="visibleMobile">
                          <td height="20"></td>
                        </tr>
                        <tr>
                          <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;">
                            Hello, ${invoiceData.customerName}.
                            <br> Thank you for shopping from our store and for your order.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" class="col">
                      <tbody>
                        <tr class="visibleMobile">
                          <td height="20"></td>
                        </tr>
                        <tr>
                          <td height="5"></td>
                        </tr>
                        <tr>
                          <td style="font-size: 21px; color: #ff0000; letter-spacing: -1px; font-family: 'Open Sans', sans-serif; line-height: 1; vertical-align: top; text-align: right;">
                            Invoice
                          </td>
                        </tr>
                        <tr>
                        <tr class="hiddenMobile">
                          <td height="50"></td>
                        </tr>
                        <tr class="visibleMobile">
                          <td height="20"></td>
                        </tr>
                        <tr>
                          <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: right;">
                            <small>ORDER : </small>${invoiceData.customerOrderNo}<br />
                            <small>DATE : ${formattedDate}</small>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- /Header -->
<!-- Order Details -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
  <tbody>
    <tr>
      <td>
        <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
          <tbody>
            <tr>
            <tr class="hiddenMobile">
              <td height="60"></td>
            </tr>
            <tr class="visibleMobile">
              <td height="40"></td>
            </tr>
            <tr>
              <td>
                <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                  <tbody>
                    <tr>
                      <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 10px 7px 0;" width="52%" align="left">
                        Item
                      </th>
                      <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="left">
                        <small>Brand</small>
                      </th>
                      <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #5b5b5b; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="center">
                        Category
                      </th>
                      <th style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33; font-weight: normal; line-height: 1; vertical-align: top; padding: 0 0 7px;" align="right">
                        Subtotal
                      </th>
                    </tr>
                    <tr>
                      <td height="1" style="background: #bebebe;" colspan="4"></td>
                    </tr>
                    <tr>
                      <td height="10" colspan="4"></td>
                    </tr>
                    <tr>
                    <td height="1" colspan="4" style="border-bottom:1px solid #e4e4e4"></td>
                  </tr>
                    <tr>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #ff0000;  line-height: 18px;  vertical-align: top; padding:10px 0;" class="article">
                      ${invoiceData?.customerModel}
                      </td>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e;  line-height: 18px;  vertical-align: top; padding:10px 0;"><small>${invoiceData?.customerBrand}</small></td>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e;  line-height: 18px;  vertical-align: top; padding:10px 0;" align="center">${invoiceData?.customerCategory}</td>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #1e2b33;  line-height: 18px;  vertical-align: top; padding:10px 0;" align="right">₹ : ${invoiceData?.customerPrice}</td>
                    </tr>
                    <tr>
                      <td height="1" colspan="4" style="border-bottom:1px solid #e4e4e4"></td>
                    </tr>
                  
              
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td height="20"></td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
<!-- /Order Details -->
<!-- Total -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
  <tbody>
    <tr>
      <td>
        <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff">
          <tbody>
            <tr>
              <td>

                <!-- Table Total -->
                <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
                  <tbody>
                    <tr>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; ">
                        Subtotal
                      </td>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; white-space:nowrap;" width="80">
                      ₹00.0
                      </td>
                    </tr>
                    <tr>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; ">
                        Shipping &amp; Handling
                      </td>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #646a6e; line-height: 22px; vertical-align: top; text-align:right; ">
                      ₹00.0
                      </td>
                    </tr>
                    <tr>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000; line-height: 22px; vertical-align: top; text-align:right; ">
                        <strong>Grand Total (Incl.Tax)</strong>
                      </td>
                      <td style="font-size: 12px; font-family: 'Open Sans', sans-serif; color: #000; line-height: 22px; vertical-align: top; text-align:right; ">
                        <strong>₹${invoiceData?.customerPrice}</strong>
                      </td>
                    </tr>
                 
                  </tbody>
                </table>
                <!-- /Table Total -->

              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </tbody>
</table>
<!-- /Total -->
<!-- Information -->

<!-- /Information -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">

  <tr>
    <td>
      <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff" style="border-radius: 0 0 10px 10px;">
        <tr>
          <td>
            <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
              <tbody>
                <tr>
                  <td style="font-size: 12px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;">
                    Have a nice day.
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr class="spacer">
          <td height="50"></td>
        </tr>

      </table>
    </td>
  </tr>
  <tr>
    <td height="20"></td>
  </tr>
</table>
       <!-- Add more invoice details here -->
       `;

    const optionss = {
      format: "A4",
    };
    // const options = {
    //   margin: {
    //     top: '0mm',
    //     bottom: '0mm',
    //     left:'0mm',
    //     right:'0mm',
    //   },
    //   padding:{
    //     top: '0mm',
    //     bottom: '0mm',
    //     left:'0mm',
    //     right:'0mm',
    //   },
    //   printBackground: true, // Include background colors and images
    //   zoomFactor: 5.0, // Adjust the zoom factor as needed
    // };

    // const file = { content: htmlContent };
    const file = { content: htmlContent1 };
    const pdfBuffer = await generatePdf(file, optionss);

    // Set response headers for PDF download
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice_${req.params.id}.pdf`
    );

    // Send the PDF as a response
    const pdfStream = Buffer.from(pdfBuffer);
    const readableStream = new Readable();
    readableStream.push(pdfStream);
    readableStream.push(null);
    readableStream.pipe(res);
  } catch (error) {
    console.error("Error generating invoice:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const getJobCard = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const itemTofind = await JobModel.findById(itemId);
    console.log(itemTofind);
    if (!itemTofind) {
      return res.status(404).json({ error: "Item not found" });
    }
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}/${
      currentDate.getMonth() + 1
    }/${currentDate.getFullYear()}`;

    const invoiceData = {
      // ... fetch invoice data based on req.params.id
      customerName: itemTofind?.username,
      customerAddress: itemTofind?.address,
      customerOrderNo: itemTofind?.jobsheetno,
      customerProblem: itemTofind?.problem,
      customerNumber: itemTofind?.number,
      customerBrand: itemTofind?.brand,
      customerModel: itemTofind?.model,
      customerCategory: itemTofind?.category,
      customerCondition: itemTofind?.condition,
      customerPlace: itemTofind?.place,
      customerPrice: itemTofind?.price,
      customerdeliveryOption: itemTofind?.deliveryOption,
      currentdate: formattedDate,
    };

    const htmlContent = `
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title> Order confirmation </title>
<meta name="robots" content="noindex,nofollow" />
<meta name="viewport" content="width=device-width; initial-scale=1.0;" />
<style type="text/css">
  @import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700);
  body { margin: 0; padding: 0; background: #e1e1e1; }
  div, p, a, li, td { -webkit-text-size-adjust: none; }
  .ReadMsgBody { width: 100%; background-color: #ffffff; }
  .ExternalClass { width: 100%; background-color: #ffffff; }
  body { width: 100%; height: 100%; background-color: #e1e1e1; margin: 0; padding: 0; -webkit-font-smoothing: antialiased; }
  html { width: 100%; }
  p { padding: 0 !important; margin-top: 0 !important; margin-right: 0 !important; margin-bottom: 0 !important; margin-left: 0 !important; }
  .visibleMobile { display: none; }
  .hiddenMobile { display: block; }

  @media only screen and (max-width: 600px) {
  body { width: auto !important; }
  table[class=fullTable] { width: 96% !important; clear: both; }
  table[class=fullPadding] { width: 85% !important; clear: both; }
  table[class=col] { width: 45% !important; }
  .erase { display: none; }
  }

  @media only screen and (max-width: 420px) {
  table[class=fullTable] { width: 100% !important; clear: both; }
  table[class=fullPadding] { width: 85% !important; clear: both; }
  table[class=col] { width: 100% !important; clear: both; }
  table[class=col] td { text-align: left !important; }
  .erase { display: none; font-size: 0; max-height: 0; line-height: 0; padding: 0; }
  .visibleMobile { display: block !important; }
  .hiddenMobile { display: none !important; }
  }
</style>


<!-- Header -->
<table width="100%" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#e1e1e1">
  <tr>
    <td height="20"></td>
  </tr>
  <tr>
    <td>
      <table width="600" border="0" cellpadding="0" cellspacing="0" align="center" class="fullTable" bgcolor="#ffffff" style="border-radius: 10px 10px 0 0;">
        <tr class="hiddenMobile">
          <td height="40"></td>
        </tr>
        <tr class="visibleMobile">
          <td height="30"></td>
        </tr>

        <tr>
          <td>
            <table width="480" border="0" cellpadding="0" cellspacing="0" align="center" class="fullPadding">
              <tbody>
                <tr>
                  <td>
                    <table width="220" border="0" cellpadding="0" cellspacing="0" align="left" class="col">
                      <tbody>
                        <tr>
                          <td align="left"> <img src="http://www.supah.it/dribbble/017/logo.png" width="32" height="32" alt="logo" border="0" /></td>
                        </tr>
                        <tr class="hiddenMobile">
                          <td height="40"></td>
                        </tr>
                        <tr class="visibleMobile">
                          <td height="20"></td>
                        </tr>
                        <tr>
                          <td style="font-size: 18px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;">
                           Name : ${invoiceData?.customerName}.
                            
                          </td>
                        
                        </tr>
                        <tr class="hiddenMobile">
                        <td height="20"></td>
                      </tr>
                   
                        
                        <tr>
                          <td  style="font-size: 18px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;">
                        Address : ${invoiceData?.customerAddress}.
                            
                          </td>
                        
                        </tr>
                        <tr class="hiddenMobile">
                        <td height="20"></td>
                   
                        <tr>
                          <td style="font-size: 18px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;">
                        Problem : ${invoiceData?.customerProblem}.
                            
                          </td>
                        
                        </tr>
                        <tr class="hiddenMobile">
                        <td height="20"></td>
                      </tr>
                        <tr>
                          <td style="font-size: 18px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;">
                        Model : ${invoiceData?.customerModel}.
                            
                          </td>
                        
                        </tr>
                        <tr class="hiddenMobile">
                        <td height="20"></td>
                      </tr>
                        <tr>
                          <td style="font-size: 18px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: left;">
                        Brand : ${invoiceData?.customerBrand}.
                            
                          </td>
                        
                        </tr>
                      </tbody>
                    </table>
                    <table width="220" border="0" cellpadding="0" cellspacing="0" align="right" class="col">
                      <tbody>
                        <tr class="visibleMobile">
                          <td height="20"></td>
                        </tr>
                        <tr>
                          <td height="5"></td>
                        </tr>
                        <tr>
                          <td style="font-size: 21px; color: #ff0000; letter-spacing: -1px; font-family: 'Open Sans', sans-serif; line-height: 1; vertical-align: top; text-align: right;">
                            Job Card
                          </td>
                        </tr>
                        <tr>
                        <tr class="hiddenMobile">
                          <td height="50"></td>
                        </tr>
                        <tr class="visibleMobile">
                          <td height="20"></td>
                        </tr>
                        <tr>
                          <td style="font-size: 18px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: right;">
                            <small>ORDER : </small>${invoiceData?.customerOrderNo}<br />
                          
                          </td>
                        </tr>
                        <tr class="hiddenMobile">
                        <td height="20"></td>
                      </tr>
                      <tr>
                      <td style="font-size: 18px; color: #5b5b5b; font-family: 'Open Sans', sans-serif; line-height: 18px; vertical-align: top; text-align: right;">
                        <small>DATE : </small>${formattedDate}<br />
                      
                      </td>
                    </tr>
                        
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
<!-- /Header -->



    `;
    let options = {};
    let file = { content: htmlContent };
    const pdfBuffer = await generatePdf(file, options);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice_${req.params.id}.pdf`
    );

    // Send the PDF as a response
    const pdfStream = Buffer.from(pdfBuffer);
    const readableStream = new Readable();
    readableStream.push(pdfStream);
    readableStream.push(null);
    readableStream.pipe(res);
  } catch (error) {
    console.error("Error generating getJobCard:", error);
    res.status(500).send("Internal Server Error");
  }
};

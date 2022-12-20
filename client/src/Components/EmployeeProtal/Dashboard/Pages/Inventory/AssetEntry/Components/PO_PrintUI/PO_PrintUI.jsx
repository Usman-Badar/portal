import React from "react";
import './PO_PrintUI.css';
import QFS from './Logos/QFS-LOGO.PNG';
import SBS from './Logos/SEABOARD-SERVICES.PNG';
import SBL from './Logos/SBL-LOGO.PNG';

// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
// import pdfMake from 'pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// import htmlToPdfmake from 'html-to-pdfmake';
// import * as html2pdf from 'html2pdf.js';


const PO_PrintUI = (props) => {
    const ListDetails = [
        {
            Sno: '01',
            desc: 'Laptop',
            Quantity: '01',
            EstimatedCost: '50000',
            TotalCost: '70000',
            Reason: 'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is',
        },
        {
            Sno: '02',
            desc: 'Laptop',
            Quantity: '01',
            EstimatedCost: '50000',
            TotalCost: '70000'
        }
    ]
    // const PDFGenerator = () => {

    //     html2canvas(document.querySelector("#PrintDiv")).then(canvas => {
    //         document.body.appendChild(canvas);  // if you want see your screenshot in body.
    //         const imgData = canvas.toDataURL('image/png');
    //         const pdf = new jsPDF();
    //         pdf.addImage(imgData, 'PNG', 0, 0);
    //         pdf.save("download.pdf");
    //     });

    // }
    


    return (
        <>
        
            <div id="PrintDiv" style={ { width: "100%", height: "100vh" } }  className="PO_PrintUI">
                <div className="PO_PrintUI_Div">
                    <h3 className=" font-weight-bolder text-center" style={ { textDecoration: 'underline' } }>Seaboard Group</h3>
                    <div className="PO_PrintUI_Logos">
                        <div><img src={QFS} alt="QFS Logo" /></div>
                        <div><img src={SBS} alt="SBS Logo" /></div>
                        <div><img src={SBL} alt="SBL Logo" /></div>
                    </div>
                    <h4 className="font-weight-bolder text-center" style={ { textDecoration: 'underline' } }>Purchase Order</h4>
                    <div className="PO_PrintUI_Top mt-5">
                        <div>
                            <p className="font-weight-bolder mr-3">{ props.info.info[0] ? props.info.info[0].company_name : null }</p>
                            <p className="font-weight-bolder mr-3">C-33, Block-2, KehkaShan, Clifton</p>
                            <p className="font-weight-bolder mr-3">Karachi-75600, Pakistan</p>
                            <p className="font-weight-bolder mr-3">Phone: (021) 35866811-4</p>
                            <p className="font-weight-bolder mr-3">Website: www.qfs.com.pk</p>
                        </div>
                        <div>
                            <div className="d-flex border">
                                <div className="border-right w-50 text-center"><p className="font-weight-bolder">Invoice Number  </p></div>
                                <div className="text-center w-50"><p>812</p></div>
                            </div>
                            <div className="d-flex border">
                                <div className="border-right w-50 text-center"><p className="font-weight-bolder">PR Number   </p></div>
                                <div className="text-center w-50"><p>{ props.info.info[0] ? props.info.info[0].pr_id : null }</p></div>
                            </div><div className="d-flex border">
                                <div className="border-right w-50 text-center"><p className="font-weight-bolder"> Date  </p></div>
                                <div className="text-center w-50"><p>{ props.info.info[0] ? props.info.info[0].request_date.toString().substring(0,10)  : null }</p></div>
                            </div>
                            <div className="d-flex border">
                                <div className="border-right w-50 text-center"><p className="font-weight-bolder">PO Number  </p></div>
                                <div className="text-center w-50"><p>SBS-09-007-21/22</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="PO_PrinUI_Venders">
                        <div >
                            <div style={{ backgroundColor: "rgb(243, 243, 243)" }}><p className="font-weight-bolder pl-2">Vendors</p></div>
                            <p>PC World</p>
                            <p>C-33, Block-2, KehkaShan, Clifton</p>
                            <p>Karachi-75600, Pakistan</p>
                            <p>Phone: (021) 35866811-4</p>
                            <p>Website: www.qfs.com.pk</p>
                        </div>
                        <div >
                            <div style={{ backgroundColor: "rgb(243, 243, 243)" }}><p className="font-weight-bolder pl-2">Ship TO:</p></div>
                            <p>{ props.info.info[0] ? props.info.info[0].company_name : null }</p>
                            <p>C-33, Block-2, KehkaShan, Clifton</p>
                            <p>Karachi-75600, Pakistan</p>
                            <p>Phone: (021) 35866811-4</p>
                            <p>Website: www.qfs.com.pk</p>
                        </div>
                    </div>
                    <div className="PO_PrintUI_Middle">
                        <div className="PO_PrintUI_Grid" style={{ backgroundColor: "rgb(243, 243, 243)" }}>
                            <div><p className="font-weight-bolder">Item No:</p></div>
                            <div><p className="font-weight-bolder">Description</p></div>
                            <div><p className="font-weight-bolder">Quantity</p></div>
                            <div><p className="font-weight-bolder" >Unit Price</p></div>
                            <div><p className="font-weight-bolder">Total</p></div>
                        </div>
                        {
                            props.info.specifications.map( // props.info.specifications[index]
                                (val, index) => {
                                    return (
                                        <>
                                            <div className="PO_PrintUI_Grid " onClick={() => props.clicked(index)}>
                                                <div><p>{index + 1}</p></div>
                                                <div><p>{val.description}</p></div>
                                                <div><p>{val.quantity}</p></div>
                                                <div><p>{val.price}</p></div>
                                                <div><p>{val.amount}</p></div>
                                            </div>
                                        </>
                                    )
                                }
                            )
                        }
                        <div className="PO_PrintUI_Grid1">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div>
                                <div className="Total"><p>Sub Total</p></div>
                                <div className="Total"><p>GST</p></div>
                                <div className="Total"><p>Shipping</p></div>
                                <div className="Total"><p>Others</p></div>
                                <div className="Total"><p>Total</p></div>
                            </div>
                            <div>
                                <div className="Total"><p>{ props.info.info[0] ? props.info.info[0].total : null }</p></div>
                                <div className="Total"><p>-</p></div>
                                <div className="Total"><p>-</p></div>
                                <div className="Total"><p>-</p></div>
                                <div className="Total"><p>{ props.info.info[0] ? props.info.info[0].total : null }</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="PO_PrintUI_Bottom">
                        <div className="PO_PrintUI_CommentBox pb-4" >
                            <div style={{ backgroundColor: "rgb(243, 243, 243)" }}><p className="font-weight-bolder">Comment and Special instruction</p></div>
                            <div ><p>{ props.info.info[0] ? props.info.info[0].comments : null }</p></div>
                        </div>
                        <div className="PO_printUI_Remarks">
                            <div className="PO_printUI_Remark">
                                <div className="DIVS_heading"><p className="font-weight-bolder">Sumbitted By</p></div>
                                <div className="DIVS" ><p className="font-weight-bolder">Name : </p><p>{props.info.info[0] ? props.info.info[0].emp_for_name : null}</p></div>
                                <div className="DIVS" ><p className="font-weight-bolder">Date : </p><p>{props.info.info[0] ? props.info.info[0].request_date.toString().substring(0,10) : null}</p></div>
                            </div>
                            <div className="PO_printUI_Remark">
                                <div className="DIVS_heading" ><p className="font-weight-bolder">Approved By</p></div>
                                <div className="DIVS" ><p className="font-weight-bolder">Name : </p><p>{props.info.info[0] ? props.info.info[0].approve_emp_name : null}</p></div>
                                <div className="DIVS" ><p className="font-weight-bolder">Date : </p><p>{props.info.info[0] ? props.info.info[0].approve_date.toString().substring(0,10) : null}</p></div>
                            </div>
                            <div className="PO_printUI_Remark">
                                <div className="DIVS_heading" ><p className="font-weight-bolder">Submitted To</p></div>
                                <div className="DIVS" ><p className="font-weight-bolder">Name : </p><p>{props.info.info[0] ? props.info.info[0].handle_emp_name : null}</p></div>
                                <div className="DIVS" ><p className="font-weight-bolder">Date : </p><p>{props.info.info[0] ? props.info.info[0].forward_date.toString().substring(0,10) : null}</p></div>
                            </div>
                        </div>
                    </div>
                    {/* <button class="btn btn-primary" onClick={PDFGenerator}>Export To PDF</button> */}
                </div>
            </div>

        </>
    )
}
export default PO_PrintUI;
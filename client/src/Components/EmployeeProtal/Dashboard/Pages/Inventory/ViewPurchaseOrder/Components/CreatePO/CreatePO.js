import { jsPDF } from "jspdf";

import QFS from '../../../../../../../../images/qfs.PNG';
import SBS from '../../../../../../../../images/sbs.PNG';
import SBL from '../../../../../../../../images/sbl.PNG';

const doc = new jsPDF(
    {
        orientation: "portrait",
        unit: "px",
        format: 'a4'
    }
);

export const CreatePO = () => {

    doc.setFontSize(30);
    doc.text(
        'SEABOARD GROUP',
        doc.internal.pageSize.getWidth() / 2,
        40,
        'center'
    );

    var img1 = new Image();
    var img2 = new Image();
    var img3 = new Image();
    img1.src = QFS;
    img2.src = SBS;
    img3.src = SBL;
    doc.addImage(img1, 'png', doc.internal.pageSize.getWidth() / 4, 78, 50, 40)
    doc.addImage(img2, 'png', doc.internal.pageSize.getWidth() / 2, 78, 50, 40)
    doc.addImage(img3, 'png', doc.internal.pageSize.getWidth() / 3, 78, 50, 40)

    doc.save("two-by-four.pdf");

}
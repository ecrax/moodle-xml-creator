const questionTemplate = `<question type="multichoice">
<name>
    <text>%question_name</text>
</name>
<questiontext format="html">
    <text><![CDATA[%question_text]]></text>
</questiontext>
<generalfeedback format="html">
    <text><![CDATA[%general_feedback]]></text>
</generalfeedback>
<defaultgrade>1.0000000</defaultgrade>
<penalty>0.3333333</penalty>
<hidden>0</hidden>
<idnumber></idnumber>
<single>true</single>
<shuffleanswers>true</shuffleanswers>
<answernumbering>abc</answernumbering>
<showstandardinstruction>0</showstandardinstruction>
<correctfeedback format="html">
    <text><![CDATA[%correct_feedback]]></text>
</correctfeedback>
<partiallycorrectfeedback format="html">
    <text><![CDATA[%partially_correct_feedback]]></text>
</partiallycorrectfeedback>
<incorrectfeedback format="html">
    <text><![CDATA[%incorrect_feedback]]></text>
</incorrectfeedback>
<shownumcorrect/>
</question>`;

export default questionTemplate;

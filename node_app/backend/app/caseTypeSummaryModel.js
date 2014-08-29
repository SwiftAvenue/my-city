/**
 * Created by DFAULUS on 8/19/2014.
 */

function CaseTypeSummary(caseTypeId, caseTypeName, totalCases) {
    this.caseTypeId = caseTypeId;
    this.caseTypeName = caseTypeName;
    this.totalCases = totalCases;
}

CaseTypeSummary.prototype.getInfo = function() {
    return this.caseTypeId + ' ' + this.caseTypeName + ' ' + this.totalCases;
}

module.exports = CaseTypeSummary;


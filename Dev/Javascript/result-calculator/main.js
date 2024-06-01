function capitalizeFirstLetter(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}
function calculateResult() {
    var name = document.getElementById('personName').value;
    var rollNumber = document.getElementById('rollNumber').value;
    var marks = parseInt(document.getElementById('personMarks').value);
    var grade;
    var resultText;
    if (marks >= 900) {
        grade = 'A1';
    }
    else if (marks >= 800) {
        grade = 'A';
    }
    else if (marks >= 700) {
        grade = 'B';
    }
    else if (marks >= 600) {
        grade = 'C';
    }
    else if (marks >= 500) {
        grade = 'D';
    }
    else {
        grade = 'F';
    }
    var formattedName = capitalizeFirstLetter(name);
    var resultDisplay = document.getElementById('resultDisplay');
    if (grade === 'F') {
        resultText = "Sorry, ".concat(formattedName, ", you have failed. Your grade is ").concat(grade, ".");
        resultDisplay.className = 'result-message fail';
    }
    else {
        resultText = "Congratulations, ".concat(formattedName, ", you have passed with grade ").concat(grade, ".");
        resultDisplay.className = 'result-message';
    }
    resultDisplay.innerText = resultText;
}

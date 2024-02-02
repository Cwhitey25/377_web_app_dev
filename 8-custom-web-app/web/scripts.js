// converts numbers into USD format
function formatAsCurrency(number) {
    var num = parseFloat(number);
    
    var formattedCurrency = num.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return formattedCurrency;
}

$(document).ready(function() {
    // does the data validation when inputting golfer details
    $('#golferForm').submit(function(event) {
        var nameValue = $('#name').val();
        var ageValue = $('#age').val();
        var sponsorValue = $('#sponsor').val();
        var nationalityValue = $('#nationality').val();

        var isValid = true;

        function isNullOrEmpty(value) {
            return value === null || $.trim(value) === '';
        }
    
        function displayRequiredErrorMessage(fieldName) {
            $('#' + fieldName + '-error').text('*This is a required field').css('color', 'red');
            $('#' + fieldName).css('border', '1px solid red');
        }
    
        function displayTypeErrorMessage(fieldName, expectedType) {
            $('#' + fieldName + '-type-error').text(`*Please enter a valid ${expectedType}`).css('color', 'red');
            $('#' + fieldName).css('border', '1px solid red');
        }

        function resetErrorMessage(fieldName) {
            $('#' + fieldName + '-error').text('');
            $('#' + fieldName + '-type-error').text('');
            $('#' + fieldName).css('border', '');
        }

        //makes sure required fields are filled in
        if (isNullOrEmpty(nameValue)) {
            displayRequiredErrorMessage('name');
            isValid = false;
        } else {
            resetErrorMessage('name');
        }

        if (isNullOrEmpty(ageValue)) {
            displayRequiredErrorMessage('age');
            isValid = false;
        } else {
                resetErrorMessage('age');
        }
        
        //makes sure text fields do not contain numbers
        if (isNaN(sponsorValue) != true && isNullOrEmpty(sponsorValue) == false) {
            displayTypeErrorMessage('sponsor', 'text');
            isValid = false;
        } else {
            resetErrorMessage('sponsor');
        }

        if (isNaN(nationalityValue) != true && isNullOrEmpty(nationalityValue) == false) {
            displayTypeErrorMessage('nationality', 'text');
            isValid = false;
        } else {
            resetErrorMessage('nationality');
        }

        // Prevent form submission if any field is empty
        if (!isValid) {
            event.preventDefault();
        }
    });
});


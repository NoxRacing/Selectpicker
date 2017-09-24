document.addEventListener("DOMContentLoaded", function () {
    selectpicker.init();
});

var selectpicker = {
    init: function() {
        if (selectpicker.checkIfDomHasSelectpicker()) {
            selectpicker.initSelectPicker();
        }
    },

    checkIfDomHasSelectpicker: function() {
        return document.querySelectorAll('.selectpicker').length > 0;
    },

    hasValueSelected: function(select) {
        var hasSelected = false;
        select.querySelectorAll('option').forEach(function(value) {
            if (value.getAttribute('selected') !== null) {
                hasSelected = true;
            }
        });
        return hasSelected;
    },

    initSelectPicker: function() {
        document.querySelectorAll('.selectpicker').forEach(function(picker) {
            var pickerParentElement = picker.parentNode;
            var divElement = document.createElement('div');
            selectpicker.createSelectpickerButton(picker, pickerParentElement, divElement);
            selectpicker.displayedValue(picker, divElement);

            divElement.innerHTML += '<div class="dropdown-menu-select"><ul class="select-option-list"></ul></div>';
            selectpicker.selectpickerEvent(divElement);

            picker.querySelectorAll('option').forEach(function(option) {
                divElement.querySelector('div.dropdown-menu-select > ul.select-option-list').innerHTML += '<li value="' + option.value + '">' + option.innerHTML + '</li>'
            });

            divElement.appendChild(picker);
        });
    },

    selectpickerEvent: function(divElement) {
        divElement.querySelector('button.selectpicker-button').addEventListener('click', function () {
            divElement.classList.toggle('open');
        });
    },

    createSelectpickerButton: function (picker, pickerParentElement, divElement) {
        pickerParentElement.replaceChild(divElement, picker);
        divElement.classList.add('selectpicker-group');
        selectPickerTitle = picker.getAttribute('title');
        divElement.innerHTML = '<button id="selectpickerButton" class="" role="button"> <span class="selectpicker-value"></span> <span class="caret"><span></button>';
        divElement.querySelector('button#selectpickerButton').setAttribute('data-type', picker.getAttribute('data-type'));
        divElement.querySelector('button#selectpickerButton').classList.add('selectpicker-button');
    },

    displayedValue: function (picker, divElement) {
        if (selectpicker.hasValueSelected(picker)) {
            divElement.querySelector('button.selectpicker-button > span.selectpicker-value').innerHTML = picker.getAttribute('title');
        } else {
            divElement.querySelector('button.selectpicker-button > span.selectpicker-value').innerHTML = picker.getAttribute('placeholder');
            divElement.querySelector('button.selectpicker-button > span.selectpicker-value').classList.add('placeholder');
        }
    }
}

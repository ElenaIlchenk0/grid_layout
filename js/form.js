(function($){
    $(function() {
        $('.datepicker').daterangepicker({
            singleDatePicker: true,
            autoUpdateInput: false,
            locale: {
                format: 'DD.MM.YYYY',
                cancelLabel: 'Clear'
            }
        });
        
        $('.datepicker').on('apply.daterangepicker', function(ev, picker) {
            $(this).val(picker.startDate.format('DD.MM.YYYY'));
        });
      
        $('.datepicker').on('cancel.daterangepicker', function(ev, picker) {
            $(this).val('');
        });


        var validators = {
            name: /^[0-9A-Za-z\s]+$/,
            date: /^(((0[1-9]|[12]\d|3[01])\.(0[13578]|1[02])\.((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\.(0[13456789]|1[012])\.((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\.02\.((19|[2-9]\d)\d{2}))|(29\.02\.((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/
        }
        
        var fields = $("input");
               

        $('#btn-submit').on('click', (event) => {
            var result = true;

            var dateStart = $('#dateStart').val();
            var dateEnd = $('#dateEnd').val();
            dateStart = new Date(dateStart.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
            dateStart = Date.parse(dateStart);

            dateEnd = new Date(dateEnd.replace(/(\d+).(\d+).(\d+)/, '$3/$2/$1'));
            dateEnd = Date.parse(dateEnd);

            if (dateStart >= dateEnd) {
                $('#dateEnd').addClass('invalid');
                event.preventDefault();
                return result = false;
            }

            for (var i = 0; i < fields.length; i++) {
                if (!(validators[fields[i].name].test(fields[i].value))) {
                    $(fields[i]).addClass('invalid');
                    event.preventDefault();
                    return result = false;
                }
            }

            if (result) { 
                var data = ($('form').serializeArray());
                $('#myModal').modal();
                $('input').val('');
                event.preventDefault();
            };
        })
        
        fields.on('change', (event) => {
            for (var i = 0; i < fields.length; i++) {
                if ((validators[fields[i].name].test(fields[i].value))) {
                    $(fields[i]).removeClass('invalid');
                }
            }
        })
    }); 
})(jQuery);
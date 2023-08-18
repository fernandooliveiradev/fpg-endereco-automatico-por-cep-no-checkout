jQuery(document).ready(function($) {

    // Função para preencher automaticamente o endereço com base no CEP
    function autocompleteAddressByCEP(cep) {
        $.ajax({
            url: 'https://brasilapi.com.br/api/cep/v2/' + cep,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
                if (data.state && data.city && data.neighborhood && data.street) {
                    // Preencha os campos de cobrança (billing) com os dados obtidos da API
                    $('#billing_state').val(data.state).change();
                    setTimeout(function() {
                        $('#billing_state').trigger('chosen:updated');
                    }, 100);
                    $('#billing_city').val(data.city);
                    $('#billing_neighborhood').val(data.neighborhood);
                    $('#billing_address_1').val(data.street);

                    // Preencha os campos de envio (shipping) com os dados obtidos da API
                    $('#shipping_state').val(data.state).change();
                    setTimeout(function() {
                        $('#shipping_state').trigger('chosen:updated');
                    }, 100);
                    $('#shipping_city').val(data.city);
                    $('#shipping_neighborhood').val(data.neighborhood);
                    $('#shipping_address_1').val(data.street);
                }
            }
        });
    }

    // Evento de mudança no campo de CEP para cobrança
    $('#billing_postcode').on('change', function() {
        var cep = $(this).val().replace(/\D/g, ''); // Remover não dígitos do CEP
        if (cep.length === 8) {
            autocompleteAddressByCEP(cep);
        }
    });

    // Evento de mudança no campo de CEP para envio
    $('#shipping_postcode').on('change', function() {
        var cep = $(this).val().replace(/\D/g, ''); // Remover não dígitos do CEP
        if (cep.length === 8) {
            autocompleteAddressByCEP(cep);
        }
    });

});
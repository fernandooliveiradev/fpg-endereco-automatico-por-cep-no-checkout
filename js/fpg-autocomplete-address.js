jQuery(document).ready(function ($) {
    // Função para preencher automaticamente o endereço com base no CEP
    function autocompleteAddressByCEP(cep, prefix) {
        // Mostra o ícone de carregamento
        $(`#${prefix}_postcode_field`).block({
            message: null,
            overlayCSS: {
                background: '#fff',
                opacity: 0.6
            }
        });

        $.ajax({
            url: 'https://brasilapi.com.br/api/cep/v2/' + cep + '?_=' + new Date().getTime(),
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                if (data && data.state && data.city && data.neighborhood && data.street) {
                    // Preenche os campos de endereço com os dados obtidos da API
                    $(`#${prefix}_state`).val(data.state).change();
                    setTimeout(function () {
                        $(`#${prefix}_state`).trigger('chosen:updated');
                    }, 100);
                    $(`#${prefix}_city`).val(data.city);
                    $(`#${prefix}_neighborhood`).val(data.neighborhood);
                    $(`#${prefix}_address_1`).val(data.street);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('Erro ao obter dados da API:', textStatus, errorThrown);
            },
            complete: function () {
                // Esconde o ícone de carregamento
                $(`#${prefix}_postcode_field`).unblock();
            }
        });
    }

    // Evento de mudança no campo de CEP
    $('form.checkout').on('input', '#billing_postcode, #shipping_postcode', function () {
        var prefix = this.id.split('_')[0];
        var cep = $(this).val().replace(/\D/g, ''); // Remover não dígitos do CEP
        if (cep.length === 8) {
            autocompleteAddressByCEP(cep, prefix);
        }
    });
});

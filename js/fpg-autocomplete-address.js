jQuery(document).ready(function ($) {
    // Função para preencher automaticamente o endereço com base no CEP
    function autocompleteAddressByCEP(cep, prefix) {
        var $prefixPostcodeField = $(`#${prefix}_postcode_field`);

        // Mostra o ícone de carregamento
        $prefixPostcodeField.block({
            message: null,
            overlayCSS: {
                background: '#fff',
                opacity: 0.6
            }
        });

        $.ajax({
            url: 'https://viacep.com.br/ws/' + cep + '/json/',
            method: 'GET',
            dataType: 'json'
        })
        .done(function (data) {
            if (data && data.uf && data.localidade && data.bairro && data.logradouro) {
                // Preenche os campos de endereço com os dados obtidos da API
                $(`#${prefix}_state`).val(data.uf).change();
                $(`#${prefix}_city`).val(data.localidade);
                $(`#${prefix}_neighborhood`).val(data.bairro);
                $(`#${prefix}_address_1`).val(data.logradouro);
                
                // Atualiza os campos escolhidos se estiverem usando o plugin Chosen
                setTimeout(function () {
                    $(`#${prefix}_state`).trigger('chosen:updated');
                }, 100);
            }
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.error('Erro ao obter dados da API:', textStatus, errorThrown);
        })
        .always(function () {
            // Esconde o ícone de carregamento
            $prefixPostcodeField.unblock();
        });
    }

    // Evento de mudança no campo de CEP
    $('form.checkout').on('input', '#billing_postcode, #shipping_postcode', function () {
        var prefix = this.id.split('_')[0];
        var cep = $(this).val().replace(/\D/g, ''); // Remover não dígitos do CEP

        // Debounce input
        clearTimeout($.data(this, 'timer'));
        var wait = setTimeout(function(){
            if (cep.length === 8) {
                autocompleteAddressByCEP(cep, prefix);
            }
        }, 1000); // Aumentei o tempo de espera para 1 segundo (1000ms)
        $(this).data('timer', wait);
    });
});

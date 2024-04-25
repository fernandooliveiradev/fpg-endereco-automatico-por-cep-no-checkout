<?php

/**
 * Plugin Name: FPG - Endereço automático por Cep no Checkout
 * Plugin URI: https://fernandooliveira.dev.br
 * Description: Adiciona preenchimento automático de endereço com base no CEP no formulário de checkout WooCommerce usando ViaCEP.
 * Version: 1.1.0
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Author: Fernando Oliveira
 * Author URI: https://fernandooliveira.dev.br
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: fpg-automatic-address
 *
 * @package FPG_endereco_automatico_por_cep_no_checkout
 */

/*
FPG - Endereço automático por Cep no Checkout is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 2 of the License, or
any later version.

FPG - Endereço automático por Cep no Checkout is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with FPG - Endereço automático por Cep no Checkout. If not, see {URI to Plugin License}.
*/

defined('ABSPATH') || exit;

// Função para enfileirar o script JavaScript
function fpg_autocomplete_address_script()
{
    // Registra o script
    wp_register_script(
        'fpg-autocomplete-address', // Nome do identificador único do script
        plugin_dir_url(__FILE__) . 'js/fpg-autocomplete-address.js', // Caminho para o arquivo JS
        array('jquery'), // Dependência (neste caso, jQuery)
        '1.0.0', // Versão do script
        true // Colocado  no rodapé da página
    );

    // Enfileira o script registrado
    wp_enqueue_script('fpg-autocomplete-address');
}

// Gancho para carregar o script no frontend do site
add_action('wp_enqueue_scripts', 'fpg_autocomplete_address_script');

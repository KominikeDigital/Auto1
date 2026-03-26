<?php
/**
 * Plugin Name: Manşet Başlıklar
 * Description: Elementor uyumlu manşet/headline eklentisi. Elementor widget, shortcode ve klasik widget desteği içerir.
 * Version: 1.0.0
 * Author: Auto1
 * Text Domain: manset-headlines
 */

if (! defined('ABSPATH')) {
    exit;
}

define('MANSET_HEADLINES_VERSION', '1.0.0');
define('MANSET_HEADLINES_FILE', __FILE__);
define('MANSET_HEADLINES_PATH', plugin_dir_path(__FILE__));
define('MANSET_HEADLINES_URL', plugin_dir_url(__FILE__));

require_once MANSET_HEADLINES_PATH . 'includes/class-manset-shortcode.php';
require_once MANSET_HEADLINES_PATH . 'includes/class-manset-legacy-widget.php';

add_action('plugins_loaded', function () {
    Manset_Headlines_Shortcode::instance();
    Manset_Headlines_Legacy_Widget::register();
});

add_action('wp_enqueue_scripts', function () {
    wp_register_style(
        'manset-headlines-style',
        MANSET_HEADLINES_URL . 'assets/css/manset.css',
        [],
        MANSET_HEADLINES_VERSION
    );

    wp_register_script(
        'manset-headlines-script',
        MANSET_HEADLINES_URL . 'assets/js/manset.js',
        [],
        MANSET_HEADLINES_VERSION,
        true
    );
});

add_action('admin_init', function () {
    register_setting('manset_headlines_settings', 'manset_headlines_items', [
        'type' => 'string',
        'sanitize_callback' => 'sanitize_textarea_field',
        'default' => "Günün fırsatı|#\nYeni modeller stokta|#",
    ]);
});

add_action('admin_menu', function () {
    add_options_page(
        'Manşet Başlıklar',
        'Manşet Başlıklar',
        'manage_options',
        'manset-headlines',
        'manset_headlines_render_settings_page'
    );
});

function manset_headlines_render_settings_page()
{
    if (! current_user_can('manage_options')) {
        return;
    }

    ?>
    <div class="wrap">
        <h1><?php esc_html_e('Manşet Başlıklar', 'manset-headlines'); ?></h1>
        <p><?php esc_html_e('Her satır için şu formatı kullanın: Başlık|https://ornek-link.com', 'manset-headlines'); ?></p>
        <form method="post" action="options.php">
            <?php settings_fields('manset_headlines_settings'); ?>
            <textarea
                name="manset_headlines_items"
                rows="10"
                class="large-text code"><?php echo esc_textarea(get_option('manset_headlines_items', '')); ?></textarea>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

add_action('elementor/widgets/register', function ($widgets_manager) {
    if (! did_action('elementor/loaded')) {
        return;
    }

    require_once MANSET_HEADLINES_PATH . 'includes/class-manset-elementor-widget.php';
    $widgets_manager->register(new Manset_Headlines_Elementor_Widget());
});

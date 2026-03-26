<?php

if (! defined('ABSPATH')) {
    exit;
}

class Manset_Headlines_Legacy_Widget extends WP_Widget
{
    public function __construct()
    {
        parent::__construct(
            'manset_headlines_widget',
            __('Manşet Başlıklar', 'manset-headlines'),
            ['description' => __('Elementor olmadan da çalışan manşet alanı.', 'manset-headlines')]
        );
    }

    public static function register()
    {
        add_action('widgets_init', function () {
            register_widget(self::class);
        });
    }

    public function widget($args, $instance)
    {
        echo $args['before_widget'];

        $label = isset($instance['label']) ? $instance['label'] : __('Manşet', 'manset-headlines');
        $speed = isset($instance['speed']) ? (int) $instance['speed'] : 3500;

        echo Manset_Headlines_Shortcode::render(get_option('manset_headlines_items', ''), [
            'label' => $label,
            'speed' => $speed,
        ]);

        echo $args['after_widget'];
    }

    public function form($instance)
    {
        $label = isset($instance['label']) ? $instance['label'] : __('Manşet', 'manset-headlines');
        $speed = isset($instance['speed']) ? (int) $instance['speed'] : 3500;
        ?>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('label')); ?>"><?php esc_html_e('Etiket', 'manset-headlines'); ?></label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('label')); ?>" name="<?php echo esc_attr($this->get_field_name('label')); ?>" type="text" value="<?php echo esc_attr($label); ?>" />
        </p>
        <p>
            <label for="<?php echo esc_attr($this->get_field_id('speed')); ?>"><?php esc_html_e('Geçiş süresi (ms)', 'manset-headlines'); ?></label>
            <input class="widefat" id="<?php echo esc_attr($this->get_field_id('speed')); ?>" name="<?php echo esc_attr($this->get_field_name('speed')); ?>" type="number" min="1000" step="100" value="<?php echo esc_attr($speed); ?>" />
        </p>
        <?php
    }

    public function update($new_instance, $old_instance)
    {
        return [
            'label' => sanitize_text_field($new_instance['label'] ?? ''),
            'speed' => max(1000, (int) ($new_instance['speed'] ?? 3500)),
        ];
    }
}

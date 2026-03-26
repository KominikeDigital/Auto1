<?php

if (! defined('ABSPATH')) {
    exit;
}

class Manset_Headlines_Shortcode
{
    private static $instance = null;

    public static function instance()
    {
        if (null === self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function __construct()
    {
        add_shortcode('manset', [$this, 'render_shortcode']);
    }

    public static function parse_items($raw)
    {
        if (is_array($raw)) {
            return array_values(array_filter(array_map(function ($item) {
                $title = isset($item['title']) ? sanitize_text_field($item['title']) : '';
                $url = isset($item['url']) ? esc_url_raw($item['url']) : '';

                if ('' === $title) {
                    return null;
                }

                return [
                    'title' => $title,
                    'url' => $url,
                ];
            }, $raw)));
        }

        $lines = preg_split('/\r\n|\r|\n/', (string) $raw);
        $items = [];

        foreach ($lines as $line) {
            $line = trim($line);
            if ('' === $line) {
                continue;
            }

            [$title, $url] = array_pad(explode('|', $line, 2), 2, '');
            $title = sanitize_text_field($title);
            $url = esc_url_raw($url);

            if ('' === $title) {
                continue;
            }

            $items[] = [
                'title' => $title,
                'url' => $url,
            ];
        }

        return $items;
    }

    public static function render($items, $args = [])
    {
        $items = self::parse_items($items);
        if (empty($items)) {
            return '';
        }

        $args = wp_parse_args($args, [
            'label' => __('Manşet', 'manset-headlines'),
            'speed' => 3500,
        ]);

        wp_enqueue_style('manset-headlines-style');
        wp_enqueue_script('manset-headlines-script');

        $uid = 'manset-' . wp_unique_id();

        ob_start();
        ?>
        <div id="<?php echo esc_attr($uid); ?>" class="manset-headlines" data-speed="<?php echo esc_attr((int) $args['speed']); ?>">
            <span class="manset-headlines__label"><?php echo esc_html($args['label']); ?></span>
            <div class="manset-headlines__items">
                <?php foreach ($items as $index => $item) : ?>
                    <div class="manset-headlines__item<?php echo 0 === $index ? ' is-active' : ''; ?>">
                        <?php if (! empty($item['url'])) : ?>
                            <a href="<?php echo esc_url($item['url']); ?>"><?php echo esc_html($item['title']); ?></a>
                        <?php else : ?>
                            <span><?php echo esc_html($item['title']); ?></span>
                        <?php endif; ?>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
        <?php

        return ob_get_clean();
    }

    public function render_shortcode($atts)
    {
        $atts = shortcode_atts([
            'label' => __('Manşet', 'manset-headlines'),
            'speed' => 3500,
        ], $atts, 'manset');

        $raw = get_option('manset_headlines_items', '');

        return self::render($raw, $atts);
    }
}

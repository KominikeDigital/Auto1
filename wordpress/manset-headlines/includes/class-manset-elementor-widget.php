<?php

if (! defined('ABSPATH')) {
    exit;
}

use Elementor\Controls_Manager;
use Elementor\Repeater;
use Elementor\Widget_Base;

class Manset_Headlines_Elementor_Widget extends Widget_Base
{
    public function get_name()
    {
        return 'manset_headlines';
    }

    public function get_title()
    {
        return __('Manşet Başlıklar', 'manset-headlines');
    }

    public function get_icon()
    {
        return 'eicon-post-list';
    }

    public function get_categories()
    {
        return ['general'];
    }

    protected function register_controls()
    {
        $this->start_controls_section('section_content', [
            'label' => __('İçerik', 'manset-headlines'),
        ]);

        $this->add_control('label', [
            'label' => __('Etiket', 'manset-headlines'),
            'type' => Controls_Manager::TEXT,
            'default' => __('Manşet', 'manset-headlines'),
        ]);

        $this->add_control('speed', [
            'label' => __('Geçiş süresi (ms)', 'manset-headlines'),
            'type' => Controls_Manager::NUMBER,
            'default' => 3500,
            'min' => 1000,
            'step' => 100,
        ]);

        $repeater = new Repeater();

        $repeater->add_control('title', [
            'label' => __('Başlık', 'manset-headlines'),
            'type' => Controls_Manager::TEXT,
            'default' => __('Yeni manşet başlığı', 'manset-headlines'),
            'label_block' => true,
        ]);

        $repeater->add_control('url', [
            'label' => __('Link', 'manset-headlines'),
            'type' => Controls_Manager::URL,
            'placeholder' => 'https://',
            'show_external' => false,
        ]);

        $this->add_control('items', [
            'label' => __('Manşetler', 'manset-headlines'),
            'type' => Controls_Manager::REPEATER,
            'fields' => $repeater->get_controls(),
            'title_field' => '{{{ title }}}',
        ]);

        $this->end_controls_section();
    }

    protected function render()
    {
        $settings = $this->get_settings_for_display();
        $items = [];

        if (! empty($settings['items']) && is_array($settings['items'])) {
            foreach ($settings['items'] as $item) {
                $items[] = [
                    'title' => $item['title'] ?? '',
                    'url' => $item['url']['url'] ?? '',
                ];
            }
        }

        if (empty($items)) {
            $items = get_option('manset_headlines_items', '');
        }

        echo Manset_Headlines_Shortcode::render($items, [
            'label' => $settings['label'] ?? __('Manşet', 'manset-headlines'),
            'speed' => isset($settings['speed']) ? (int) $settings['speed'] : 3500,
        ]);
    }
}

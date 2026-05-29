<?php
/**
 * Plugin Name: Post Word Count for WPGraphQL
 * Description: Registers a wordCount integer field on the Post type in WPGraphQL.
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

add_action( 'graphql_register_types', function () {
    if ( ! function_exists( 'register_graphql_field' ) ) {
        return;
    }

    register_graphql_field( 'Post', 'wordCount', [
        'type'        => 'Integer',
        'description' => __( 'The number of words in the post content.', 'post-word-count-graphql' ),
        'resolve'     => function ( $post ) {
            $post_object = get_post( $post->databaseId );
            if ( ! $post_object instanceof WP_Post ) {
                return 0;
            }
            $content = wp_strip_all_tags(
                apply_filters( 'the_content', $post_object->post_content )
            );
            return str_word_count( $content );
        },
    ] );
} );
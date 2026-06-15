GAME_SELECT = """
SELECT
    g.*,
    COALESCE(
        (
            SELECT json_agg(
                json_build_object(
                    'game_id', gw.game_id,
                    'website_type', gw.website_type,
                    'url', gw.url
                )
            )
            FROM game_websites gw
            WHERE gw.game_id = g.id
        ),
        '[]'
    ) AS websites
FROM games g
"""
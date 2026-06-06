<?php
header('Content-Type: application/xml; charset=utf-8');

echo '<?xml version="1.0" encoding="UTF-8"?>';
?>

<?php
    $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
        ? 'https'
        : 'http';

    $host = $scheme . '://' . $_SERVER['HTTP_HOST'];
?>

<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc><?php echo $host ?>/</loc>
    </url>

<?php

    require('connect.php');

    $sql = ('SELECT id, added_at FROM tasks ORDER BY id ASC');
    $stmt = $DBH->prepare($sql);
    $stmt->execute();

    while ($row = $stmt->fetch(PDO::FETCH_LAZY)) {?>
        <url>
            <loc><?php echo $host ?>/game/<?php echo htmlspecialchars($row['id']) ?></loc>
            <lastmod><?php echo date('Y-m-d', strtotime($row['added_at'])) ?></lastmod>
        </url>
    <?php } ?>
</urlset>

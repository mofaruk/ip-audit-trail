composer install --optimize-autoloader --no-dev --no-interaction --prefer-dist
composer dump-autoload
grep -oP '^\s*APP_KEY\s*=\s*\K\S+' .env || php artisan key:generate

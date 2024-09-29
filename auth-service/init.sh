composer install --optimize-autoloader --no-dev --no-interaction --prefer-dist
grep -oP '^\s*APP_KEY\s*=\s*\K\S+' .env || php artisan key:generate
php artisan jwt:secret
php artisan migrate --seed
php artisan optimize:clear
php artisan optimize

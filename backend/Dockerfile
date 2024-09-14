FROM composer:2.5 AS build
WORKDIR /app

COPY . .

RUN composer install --optimize-autoloader --no-dev --no-interaction --prefer-dist


RUN php artisan config:cache \
    && php artisan route:cache \
    && php artisan view:cache

FROM php:8.3-fpm-alpine
WORKDIR /var/www

RUN apk --no-cache add bash libpng-dev libjpeg-turbo-dev freetype-dev zip libzip-dev unzip curl

RUN docker-php-ext-install pdo pdo_mysql gd zip

COPY --from=build /app /var/www

RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www

EXPOSE 9000

CMD php -S 0.0.0.0:9000 -t public

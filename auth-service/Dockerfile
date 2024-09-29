FROM php:8.3-fpm

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    curl

RUN docker-php-ext-install pdo pdo_mysql zip gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

COPY . .

RUN composer install --optimize-autoloader --no-dev --no-interaction --prefer-dist

RUN chown -R www-data:www-data /var/www \
    && chmod -R 755 /var/www

EXPOSE 8000

CMD sh ./init.sh && php -S 0.0.0.0:8000 -t public

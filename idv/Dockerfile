FROM php:8.1-cli

RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev \
    libzip-dev unzip libonig-dev libxml2-dev \
    curl libicu-dev \
    && docker-php-ext-install mysqli pdo pdo_mysql zip intl

RUN curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer

WORKDIR /var/www/html

COPY . .

EXPOSE 8080

CMD ["php", "spark", "serve", "--host", "0.0.0.0", "--port", "8080"]

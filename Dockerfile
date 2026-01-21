FROM nginx:alpine

# Remove configuração padrão do nginx que pode estar conflitando
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copia arquivos estáticos do React
COPY build /usr/share/nginx/html

# Copia nossa configuração customizada
COPY nginx.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
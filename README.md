# DicaCommunity - Backend

Este é o backend da aplicação **DicaCommunity**, uma plataforma de compartilhamento de dicas e interação entre usuários.

## Tecnologias Utilizadas

- **Node.js** e **Express**: para criação de uma API segura e de alto desempenho.
- **MongoDB** com **Prisma**: banco de dados flexível e consultas otimizadas.
- **JWT**: autenticação baseada em tokens para segurança.
- **Firebase Storage**: armazenamento de imagens dos usuários e postagens.
- **Nodemon**: para reinicialização automática do servidor durante o desenvolvimento.
- **Bcryptjs**: Biblioteca para hash de senhas, garantindo segurança na autenticação de usuários.
- **Dotenv**: Carrega variáveis de ambiente a partir de um arquivo `.env`, mantendo segredos e configurações fora do código-fonte.
- **Firebase-admin**: SDK para interagir com os serviços do Firebase, incluindo autenticação e armazenamento.
- **Multer**: Middleware para manipulação de `multipart/form-data`, facilitando o upload de arquivos.

## Funcionalidades Principais

- Autenticação e autorização de usuários.
- Sistema de postagens com likes e comentários em tempo real.
- Upload e visualização de imagens.

## Como Executar o Projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/FelipeOropeza/Api-postagens.git
   cd Api-postagens

2. **Certifique-se de ter o Node.js instalado**:
  Versão mínima recomendada: 14.x

3. **Instale as dependências**:
   ```bash
   npm install

4. **Crie o arquivo .env com base no arquivo .env.example fornecido**:
   Configure as variáveis de ambiente de acordo com as credenciais e configurações do seu ambiente.

5. **Crie as coleções no banco de dados**: Para aplicar o modelo de dados e criar as coleções no MongoDB, execute o seguinte comando do Prisma:
   ```bash
   npx prisma db push

6. **Execute o servidor**:
    ```bash
    npm run dev

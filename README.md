  Arthur Bortoluzzi Coelho
  Luiz Felipe Gonçalves Claudino
  Rodrigo Mattos Miranda

## Configuração do JSON Server

Este projeto utiliza o `json-server` para simular uma API REST para gerenciamento de funcionários.

### Como executar

1. **Instalar dependências** (se ainda não instalou):
```bash
npm install
```

2. **Executar o json-server em um terminal**:
```bash
npm run server
```
O servidor estará rodando em `http://localhost:3001`

3. **Executar a aplicação React em outro terminal**:
```bash
npm run dev
```

### Endpoints disponíveis

- `GET http://localhost:3001/funcionarios` - Lista todos os funcionários
- `GET http://localhost:3001/funcionarios/:id` - Busca funcionário por ID
- `POST http://localhost:3001/funcionarios` - Cria novo funcionário
- `PATCH http://localhost:3001/funcionarios/:id` - Atualiza funcionário
- `DELETE http://localhost:3001/funcionarios/:id` - Remove funcionário

### Estrutura dos dados

O arquivo [db.json](db.json) contém os dados iniciais com 4 funcionários de exemplo. Cada funcionário possui os seguintes campos:

- `id` (gerado automaticamente)
- `fullName` - Nome completo
- `email` - E-mail
- `phone` - Telefone
- `cpf` - CPF
- `rg` - RG
- `birthDate` - Data de nascimento
- `address` - Endereço completo
- `role` - Cargo/Função
- `department` - Departamento
- `admissionDate` - Data de admissão
- `salary` - Salário
- `workSchedule` - Horário de trabalho
- `observations` - Observações adicionais
- `password` - Senha (criptografada em produção)
- `status` - Status (Ativo, Inativo, Férias, Licença)
- `permissions` - Array de permissões
- `lastLogin` - Último acesso
- `evaluationsCount` - Contador de avaliações
- `visitsCount` - Contador de visitas

### Funcionalidades implementadas

- ✅ Listagem de funcionários com busca e filtro por cargo
- ✅ Cadastro de novos funcionários
- ✅ Visualização detalhada de funcionários (modal)
- ✅ Edição de funcionários existentes
- ✅ Exclusão de funcionários com confirmação
- ✅ Integração com json-server via API REST (GET, POST, PATCH, DELETE)
- ✅ Validação de formulário
- ✅ Estados de loading
- ✅ Tratamento de erros
- ✅ Máscaras de input (Telefone, CPF, Datas e Salário) usando @react-input/mask

### Máscaras de Input

O projeto utiliza a biblioteca `@react-input/mask` para aplicar máscaras automáticas nos seguintes campos:

- **Telefone**: `(00) 00000-0000`
- **CPF**: `000.000.000-00`
- **Data de Nascimento**: `DD/MM/AAAA`
- **Data de Admissão**: `DD/MM/AAAA`
- **Salário**: `R$ 00.000,00` (formatação automática de moeda brasileira)

As máscaras são aplicadas automaticamente durante a digitação, facilitando a entrada de dados no formato correto.

**Formato de Datas**: As datas são exibidas no formato brasileiro (DD/MM/AAAA) na interface, mas são armazenadas no formato ISO (AAAA-MM-DD) no banco de dados para garantir compatibilidade.

### Ações do Card de Funcionário

Cada card de funcionário possui três botões de ação:

1. **Visualizar (ícone de olho - azul)**
   - Abre um modal com todos os detalhes do funcionário
   - Exibe informações pessoais, profissionais, observações e estatísticas
   - Modo somente leitura

2. **Editar (ícone de lápis - verde)**
   - Carrega os dados do funcionário no formulário
   - Permite atualizar todas as informações
   - O título do formulário muda para "Editar Funcionário"
   - Botão de submissão muda para "Atualizar Funcionário"

3. **Excluir (ícone de lixeira - vermelho)**
   - Solicita confirmação antes de excluir
   - Remove o funcionário do sistema permanentemente
   - Atualiza a lista automaticamente após exclusão
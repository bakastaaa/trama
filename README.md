# Trama

Loja online de roupas. Projeto semestral de DIU 2026/2 (UDESC/CEAVI).
Front-end em **React + Vite**; os dados criados pela pessoa ficam no **LocalStorage**. A sessão usa LocalStorage quando a opção "Manter conectado" está marcada e SessionStorage quando não está.

## Como rodar

```bash
npm install
npm run dev        # desenvolvimento (http://localhost:5173)
npm run build      # gera a versão de produção na pasta dist/
npm run preview    # abre a versão de produção (http://localhost:4173)
```

O Lighthouse deve ser medido sobre `npm run build` + `npm run preview`, em janela anônima.

## Telas (cada uma tem endereço próprio)

| Rota | Tela | O que faz |
|------|------|-----------|
| `/` | Início | Banner, filtro por categoria, mais vendidos, favoritos |
| `/busca` | Busca | Filtros (categoria, tamanho, cor, preço, avaliação), chips, ordenação, "ver mais" |
| `/produto/:id` | Produto | Galeria, tamanho recomendado, sacola, frete, 360°, provador, avaliações |
| `/sacola` | Sacola | Alterar quantidade, remover item, resumo |
| `/finalizar` | Finalizar compra | Endereço, pagamento e criação do pedido (exige login) |
| `/conta` | Minha conta | Dados, medidas, pedidos (cancelar/remover) e favoritos (exige login) |
| `/entrar` e `/cadastro` | Entrar e Criar conta | Cadastro real, validação, mostrar/ocultar senha e opção de manter a sessão conectada |

## Estrutura de pastas

```
src/
  main.jsx            entrada da aplicação
  App.jsx             rotas
  estilos/            base.css (variáveis e temas) · layout.css (grids) · components.css (componentes)
  contextos/          TemaContexto (claro/escuro) · LojaContexto (conta, sacola, pedidos...) · AvisoContexto
  servicos/           armazenamento (LocalStorage) · usuarios (hash da senha) · frete · tamanho
  dados/              catalogo.js (produtos da loja)
  componentes/        Cabecalho, Campo, Janela, CartaoProduto, Estrelas, Icone...
  paginas/            Inicio, Busca, Produto, Sacola, Finalizar, Conta, Entrar, Cadastro
public/               logos, ilustrações dos produtos e robots.txt
```

## Requisitos do guia final × onde estão

| Requisito | Como está feito | Como demonstrar |
|-----------|-----------------|-----------------|
| **Modo claro e escuro** | Botão sol/lua no cabeçalho (e nas telas de entrar/cadastro). Todas as cores são variáveis CSS em `base.css`; o tema escuro só troca o valor delas (`:root[data-tema="escuro"]`). A escolha vai para `trama:tema` e um script no `index.html` aplica o tema antes de desenhar a página, sem "piscar". | Trocar o tema e recarregar a página. |
| **LocalStorage (sem mock)** | Conta, sacola, favoritos, pedidos, avaliações, medidas e tema são salvos e lidos do LocalStorage (`useDadoSalvo`). A sessão temporária usa SessionStorage. O catálogo é fixo, como seria o de um servidor. | Criar conta, favoritar, adicionar à sacola, fazer um pedido e avaliar; recarregar; abrir DevTools > Application e mostrar as chaves `trama:*`. |
| **Framework** | React 18 com Vite e React Router. Componentes por responsabilidade, estado compartilhado por Context e páginas carregadas sob demanda (`lazy`). | Mostrar `src/` e explicar `LojaContexto` e `useDadoSalvo`. |
| **Princípios de UI** | Veja a tabela abaixo. | Citar o princípio ao mostrar cada tela. |
| **Acessibilidade e responsividade** | HTML semântico, rótulos em todos os campos, foco visível, link "Pular para o conteúdo", `aria-pressed`/`aria-live`, alvos de toque de 44 px, layout de 320 a 1920 px. | Lighthouse e redimensionar a janela. |

### Fluxo completo para a demonstração

1. Trocar o tema e recarregar.
2. Buscar "calça", filtrar por tamanho e ordenar por preço.
3. Abrir um produto, informar medidas (o tamanho recomendado é selecionado) e adicionar à sacola.
4. Ir para a sacola, mudar a quantidade e clicar em **Finalizar compra**.
5. Criar a conta (mostrar as mensagens de erro de validação) e voltar ao pedido.
6. Confirmar o pedido; ele aparece em **Minha conta**. Recarregar e mostrar que continua lá.
7. Escrever uma avaliação, recarregar e mostrar que ela continua na página do produto.

## Decisões de UI (princípios)

| Princípio | Onde aparece |
|-----------|--------------|
| **Consistência** | Mesmo cabeçalho em todas as telas; botões, chips, cartões e campos reaproveitados; cores, fontes e espaçamentos (múltiplos de 8) só por variáveis CSS. |
| **Hierarquia visual** | Títulos em fonte de destaque, preço grande, o único botão lima da tela é a ação principal (Entrar, Adicionar à sacola, Finalizar). |
| **Feedback** | Contador da sacola, `Adicionado à sacola`, estados "Entrando..." e "Criando conta...", favoritos com `aria-pressed`, avisos lidos por leitor de tela. |
| **Prevenção de erros** | Validação por campo antes de enviar, máscara de CEP, tamanho esgotado desabilitado, aviso ao esquecer o tamanho, confirmação em duas etapas para cancelar pedido, senha com letras e números. |
| **Clareza** | Rótulos visíveis, mensagens de erro específicas ("O CEP precisa ter 8 números"), estados vazios com um próximo passo, breadcrumb na página de produto. |

## Dados guardados no LocalStorage

| Chave | Conteúdo |
|-------|----------|
| `trama:tema` | `"claro"` ou `"escuro"` |
| `trama:usuarios` | Contas (nome, e-mail, **hash** da senha com sal; a senha nunca é guardada) |
| `trama:sessao` | Id da pessoa logada; fica no LocalStorage se "Manter conectado" estiver marcado e no SessionStorage caso contrário |
| `trama:sacola`, `trama:favoritos` | Itens da sacola e ids favoritos |
| `trama:pedidos` | Pedidos criados |
| `trama:avaliacoes`, `trama:marcacoes` | Avaliações escritas, "útil" e denúncias |
| `trama:medidas` | Altura e peso para recomendar o tamanho |

## Lighthouse (versão de produção, 4 telas, mobile e desktop)

Medido com o Lighthouse CLI sobre `npm run build` + `npm run preview`.

| Tela | Modo | Desempenho | Acessibilidade | Práticas recomendadas | SEO |
|------|------|-----------:|---------------:|----------------------:|----:|
| `/` | Desktop | 100 | 100 | 100 | 100 |
| `/` | Mobile | 92 a 100 | 100 | 100 | 100 |
| `/busca` | Desktop | 100 | 100 | 100 | 100 |
| `/busca` | Mobile | 96 | 100 | 100 | 100 |
| `/produto/1` | Desktop | 100 | 100 | 100 | 100 |
| `/produto/1` | Mobile | 98 | 100 | 100 | 100 |
| `/cadastro` | Desktop | 100 | 100 | 100 | 100 |
| `/cadastro` | Mobile | 99 | 100 | 100 | 100 |

> Estes números foram medidos num ambiente sem internet, com uma versão de produção que **não carrega a fonte dos títulos (Adobe Fonts)**, para a rede externa não distorcer o resultado. Rodem de novo no computador da apresentação, em janela anônima, e usem os prints deles nos slides (cada print deve mostrar o endereço e o modo).

**O que impediu 100 no Desempenho mobile:** o tempo de bloqueio da tela (TBT) e, nas páginas com foto, o LCP. O teste mobile simula uma CPU 4 vezes mais lenta, e o JavaScript do próprio React (cerca de 60 KB comprimidos) leva tempo para iniciar. A nota varia de 3 a 5 pontos entre execuções.
**O que foi tentado:** imagens e logos otimizados (os SVGs do grupo caíram de 365 KB para 24 KB); páginas carregadas sob demanda (`lazy`); primeira tela desenhada em pedaços com `startTransition`; `content-visibility` na vitrine; foto principal do produto com `fetchpriority="high"`; fonte Inter servida localmente e fonte externa carregada depois da página.

## Testes feitos

- `npm run build`: versão de produção gerada sem erros.
- Teste manual no Chromium: persistência do tema, busca por produto, validação de tamanho, inclusão na sacola e proteção do checkout por login.
- Contraste calculado: lima com texto escuro em 17,74:1 e coração vermelho sobre lima em 5,91:1 (mínimo WCAG para texto normal: 4,5:1).
- **Ainda falta registrar** o teste manual completo de cadastro, pedido, cancelamento, teclado e responsividade no computador da apresentação.
- **Ainda falta testar** em Firefox ou Safari e gerar os seis relatórios finais do Lighthouse em janela anônima.

## Limitações conhecidas

- Não há servidor: a conta existe só no navegador onde foi criada, então não é segurança de verdade (a senha é guardada como hash com sal, mas qualquer pessoa com acesso ao navegador vê os dados).
- Frete é uma **simulação** pelo primeiro dígito do CEP.
- **Provador virtual** e **visualização 360°** são protótipos de interface (a IA e as imagens 360° ainda não existem).
- Login com Google e Facebook mostra uma mensagem avisando que ainda não está disponível.
- Fotos dos produtos: ilustrações em SVG e emojis no lugar de fotos reais.
- A fonte dos títulos vem do Adobe Fonts e precisa de internet; sem ela, entra uma fonte padrão.

## Roadmap

| # | Evolução | Status |
|---|----------|--------|
| 1 | Busca inteligente com IA e pesquisa por foto | Planejado (hoje há busca por nome, categoria e cor) |
| 2 | Filtros mais claros e organizados | Feito em `/busca` (5 grupos, chips removíveis, ordenação) |
| 3 | Recomendação inteligente de tamanho com base nas medidas cadastradas | Protótipo funcionando (regra por altura e peso; medidas salvas na conta) |
| 4 | Provador virtual com IA | Protótipo de interface (envio de foto e prévia) |
| 5 | Visualização 3D/360° dos produtos | Protótipo de interface (giro simulado) |
| 6 | Página de perfil melhorada | Em andamento (`/conta` com dados, medidas, pedidos e favoritos) |
| 7 | Maior consistência visual entre loja, carrinho e checkout | Feito (sacola e finalização usam os mesmos componentes e temas) |
| 8 | Experiência customizada | Em andamento (tema escuro e medidas salvas); falta recomendação por histórico |
| 9 | Avaliações dos produtos | Feito (resumo por nota, escrever, excluir, "útil" e denunciar, tudo salvo) |

## Registro de uso de IA

- **Ferramentas:** Claude (Anthropic) e ChatGPT/Codex (OpenAI).
- **Para quê:** apoio na migração para React/Vite, componentização, tema claro/escuro, persistência, revisão do fluxo, correções de login, validação do build e preparação da apresentação.
- **O que foi aproveitado:** organização em páginas e componentes, Context API, hook de persistência, validações junto aos campos, tema persistente e sugestões de acessibilidade.
- **O que foi ajustado pelo grupo:** textos, fluxo da demonstração, opção de manter a sessão conectada, controle de visibilidade da senha e registro de testes baseado apenas em evidências disponíveis.
- **O que foi descartado:** afirmações de testes automatizados sem os respectivos arquivos e funcionalidades que não poderiam ser explicadas ou demonstradas pelo grupo.

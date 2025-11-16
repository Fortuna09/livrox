# 📁 Estrutura de Componentes - LivroX

## ✅ Refatoração Completa com Arquivos Separados

Cada componente agora segue a estrutura padrão do Angular com **arquivos separados** para HTML, SCSS e TypeScript.

---

## 📊 Estrutura de Componentes

### 1. PageCounterComponent
```
📁 src/app/components/page-counter/
├── page-counter.ts          # Lógica do componente
├── page-counter.html         # Template HTML
└── page-counter.scss         # Estilos isolados
```

**Responsabilidade**: Botões +/- para incrementar/decrementar páginas lidas

**HTML** (19 linhas):
- Seção com fundo verde
- Label descritivo
- 2 botões (➖ e ➕) com desabilitação condicional
- Display de páginas lidas

**SCSS** (75 linhas):
- Estilo de container verde com borda
- Botões responsivos com hover e transições
- Layout flexbox centralizado

**TypeScript** (17 linhas):
- @Input: `pagesRead`, `totalPages`
- @Output: `increase`, `decrease`
- Métodos: `onIncrease()`, `onDecrease()`

---

### 2. ReadingStatsComponent
```
📁 src/app/components/reading-stats/
├── reading-stats.ts          # Lógica do componente
├── reading-stats.html         # Template HTML
└── reading-stats.scss         # Estilos isolados
```

**Responsabilidade**: Exibir grid com 4 estatísticas de leitura

**HTML** (25 linhas):
- Grid responsivo de 4 cards
- Cards: Páginas Lidas, Progresso, Tempo, Status
- Barra de progresso visual
- Classe condicional para "Concluído"

**SCSS** (56 linhas):
- Grid responsivo (auto-fit)
- Estilo de cards com fundo cinza
- Card "Concluído" com borda verde
- Barra de progresso com gradiente azul

**TypeScript** (23 linhas):
- @Input: `pagesRead`, `totalPages`, `progress`, `isCompleted`
- Getter: `statusText` (computed property)
- Lógica de texto dinâmico do status

---

### 3. NotStartedCardComponent
```
📁 src/app/components/not-started-card/
├── not-started-card.ts       # Lógica do componente
├── not-started-card.html      # Template HTML
└── not-started-card.scss      # Estilos isolados
```

**Responsabilidade**: Card de "Livro Não Iniciado" com botão de início

**HTML** (9 linhas):
- Card centralizado
- Ícone 📖
- Título e descrição
- Botão "🚀 Iniciar Leitura"

**SCSS** (39 linhas):
- Container com padding
- Card com borda tracejada
- Botão com gradiente roxo
- Animações de hover

**TypeScript** (12 linhas):
- @Output: `startReading`
- Método: `onStartReading()`

---

### 4. ReadingCalendarComponent
```
📁 src/app/components/reading-calendar/
├── reading-calendar.ts       # Lógica do componente
├── reading-calendar.html      # Template HTML
└── reading-calendar.scss      # Estilos isolados
```

**Responsabilidade**: Calendário GitHub + Formulário de leitura anterior + Ações

**HTML** (53 linhas):
- Header com título e 2 botões de ação
- Formulário condicional (data + páginas)
- Grid de calendário GitHub com cores de intensidade
- Legenda de intensidade
- Mensagem para calendário vazio

**SCSS** (202 linhas):
- Container com borda cinza
- Header com layout flexbox
- Formulário com inputs estilizados
- Grid de calendário com 5 níveis de intensidade
- Legenda horizontal
- Hover effects nos quadradinhos

**TypeScript** (40 linhas):
- @Input: `calendarDays`, `startDateFormatted`, `maxDate`
- @Output: `addActivity`, `cancelReading`
- Interface: `CalendarDay`, `ManualActivity`
- Métodos: `onToggleForm()`, `onSaveActivity()`, `onCancelReading()`, `getTooltip()`

---

## 🎯 Vantagens da Estrutura

### ✅ **Separação de Responsabilidades**
```
HTML  → Estrutura e Template
SCSS  → Estilos e Visual
TS    → Lógica e Comportamento
```

### ✅ **Facilita Manutenção**
- Cada arquivo tem UMA responsabilidade
- Fácil localizar onde fazer mudanças
- Templates HTML legíveis

### ✅ **Reutilização**
- Componentes totalmente isolados
- SCSS encapsulado (não vaza estilos)
- Podem ser usados em qualquer lugar

### ✅ **Testabilidade**
- HTML separado facilita testes de snapshot
- SCSS pode ser testado visualmente
- TypeScript fácil de testar unitariamente

### ✅ **Colaboração**
- Designer trabalha no SCSS
- Desenvolvedor no TS
- UX no HTML
- Sem conflitos!

---

## 📐 Padrão de Organização

### Cada componente segue:

```typescript
// 1. Imports
import { Component, Input, Output, EventEmitter } from '@angular/core';

// 2. Interfaces (se necessário)
export interface CalendarDay { ... }

// 3. Component Decorator
@Component({
  selector: 'app-nome-do-componente',
  standalone: false,
  templateUrl: './nome-do-componente.html',
  styleUrls: ['./nome-do-componente.scss']
})

// 4. Class
export class NomeDoComponente {
  // 4.1. @Input properties
  @Input() prop1: type;
  
  // 4.2. @Output events
  @Output() evento = new EventEmitter<type>();
  
  // 4.3. Internal state
  private internalState: type;
  
  // 4.4. Getters (computed)
  get computed(): type { ... }
  
  // 4.5. Methods
  onAction(): void { ... }
}
```

---

## 🗂️ Estrutura Final do Projeto

```
📁 src/app/
├── 📁 components/
│   ├── 📁 page-counter/
│   │   ├── page-counter.ts       (17 linhas)
│   │   ├── page-counter.html     (19 linhas)
│   │   └── page-counter.scss     (75 linhas)
│   │
│   ├── 📁 reading-stats/
│   │   ├── reading-stats.ts      (23 linhas)
│   │   ├── reading-stats.html    (25 linhas)
│   │   └── reading-stats.scss    (56 linhas)
│   │
│   ├── 📁 not-started-card/
│   │   ├── not-started-card.ts   (12 linhas)
│   │   ├── not-started-card.html (9 linhas)
│   │   └── not-started-card.scss (39 linhas)
│   │
│   ├── 📁 reading-calendar/
│   │   ├── reading-calendar.ts   (40 linhas)
│   │   ├── reading-calendar.html (53 linhas)
│   │   └── reading-calendar.scss (202 linhas)
│   │
│   └── components-module.ts      (Módulo compartilhado)
│
├── 📁 services/
│   ├── reading-progress.service.ts
│   ├── date-utils.service.ts
│   └── book.service.ts
│
├── 📁 constants/
│   └── reading.constants.ts
│
└── 📁 pages/
    └── 📁 book-details/
        ├── book-details.ts       (185 linhas) ← Reduzido!
        ├── book-details.html     (45 linhas)  ← Simplificado!
        └── book-details.scss     (90 linhas)  ← Limpo!
```

---

## 📏 Comparação: Antes vs Depois

### Antes (Template Inline):
```typescript
@Component({
  template: `
    <div class="long-html">
      <!-- 50+ linhas de HTML aqui -->
      <!-- Difícil de ler -->
      <!-- Sem syntax highlight adequado -->
    </div>
  `,
  styles: [`
    .long-css { /* ... */ }
    /* Mais 100+ linhas de CSS */
  `]
})
```

❌ **Problemas**:
- Difícil de ler e manter
- Sem syntax highlight adequado
- Templates grandes poluem o arquivo TS
- Estilos misturados com lógica

### Depois (Arquivos Separados):
```typescript
@Component({
  templateUrl: './component.html',    // ✅ Clean
  styleUrls: ['./component.scss']     // ✅ Organized
})
```

✅ **Vantagens**:
- Código limpo e organizado
- Syntax highlight completo
- Fácil navegação entre arquivos
- Responsabilidades separadas

---

## 🎨 Exemplo de Uso

### No HTML do BookDetails:
```html
<!-- Componente 1: Card "Não Iniciado" -->
<app-not-started-card 
  *ngIf="!hasStartedReading()"
  (startReading)="startReading()">
</app-not-started-card>

<!-- Componente 2: Contador de Páginas -->
<app-page-counter
  *ngIf="hasStartedReading()"
  [pagesRead]="book.pagesRead || 0"
  [totalPages]="book.totalPages || 0"
  (increase)="increasePages()"
  (decrease)="decreasePages()">
</app-page-counter>

<!-- Componente 3: Calendário -->
<app-reading-calendar
  *ngIf="hasStartedReading()"
  [calendarDays]="calendarDays"
  [startDateFormatted]="formatDate(book.startReadingDate!)"
  [maxDate]="getTodayDate()"
  (addActivity)="onManualActivityAdded($event)"
  (cancelReading)="cancelReading()">
</app-reading-calendar>

<!-- Componente 4: Estatísticas -->
<app-reading-stats
  *ngIf="hasStartedReading()"
  [pagesRead]="book.pagesRead || 0"
  [totalPages]="book.totalPages || 0"
  [progress]="getProgress()"
  [isCompleted]="book.isCompleted || false">
</app-reading-stats>
```

**Total**: 45 linhas vs 130+ linhas (antes) = **-65% de código** 🎉

---

## ✅ Checklist de Qualidade

### Cada componente atende:
- ✅ **Single Responsibility**: Faz UMA coisa bem feita
- ✅ **Arquivos Separados**: HTML, SCSS e TS isolados
- ✅ **Encapsulamento**: Estilos não vazam
- ✅ **Interface Clara**: @Input/@Output bem definidos
- ✅ **Reutilizável**: Pode ser usado em qualquer lugar
- ✅ **Testável**: Lógica separada da apresentação
- ✅ **Documentado**: Código auto-explicativo

---

## 🚀 Próximos Passos

1. **Adicionar Testes**:
   ```bash
   page-counter.component.spec.ts
   reading-stats.component.spec.ts
   not-started-card.component.spec.ts
   reading-calendar.component.spec.ts
   ```

2. **Storybook** (Opcional):
   - Documentar componentes visualmente
   - Playground interativo
   - Design system

3. **Acessibilidade**:
   - ARIA labels
   - Navegação por teclado
   - Screen reader support

---

**Resultado Final**: Código profissional, organizado e fácil de manter! 🎯

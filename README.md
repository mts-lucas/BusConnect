# BusConnect

# **Como Executar o Projeto React**



## **Passo 1: Clonar o Projeto (se necessário)**
Se o projeto estiver em um repositório Git, clone-o:
```bash
git clone git@github.com:mts-lucas/BusConnect.git
cd BusConnect
```

---

## **Passo 2: Instalar as Dependências**
Execute o seguinte comando na raiz do projeto para instalar as dependências:
```bash
npm install
# ou, se estiver usando Yarn:
yarn install
```

---
## **Passo 3: Entrar no diretório do App**
Se o projeto estiver em um repositório Git, clone-o:
```bash
cd busconnect
```


## **Passo 4: Iniciar o Projeto**
Execute o projeto com o Expo:
```bash
npx expo start
```

Isso abrirá uma interface no terminal com um **QR Code** e opções para executar o app.

---

## **Passo 4: Executar o Aplicativo**
Você pode executar o aplicativo de três formas:

### **1. No Dispositivo Físico (via Expo Go)**
- Instale o app **Expo Go** na sua loja de aplicativos ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent) | [iOS](https://apps.apple.com/br/app/expo-go/id982107779)).
- Abra a câmera do celular e escaneie o **QR Code** exibido no terminal.

### **2. Em um Emulador/Simulador**
- **Android (Android Studio Emulator)**:
  - Abra o Android Studio e inicie um emulador.
  - No terminal, pressione `a` para abrir o app no emulador.

- **iOS (Xcode Simulator)**:
  - Requer um Mac com Xcode instalado.
  - No terminal, pressione `i` para abrir o simulador.

### **3. Navegador (para testes web)**
- Pressione `w` para abrir uma versão web no navegador (funcionalidade experimental).

---

## **Comandos Úteis**
| Comando               | Descrição                                  |
|-----------------------|--------------------------------------------|
| `expo start`          | Inicia o servidor de desenvolvimento      |
| `expo start --web`    | Inicia o app no modo web                  |
| `expo start --ios`    | Inicia diretamente no simulador iOS       |
| `expo start --android`| Inicia diretamente no emulador Android    |
| `expo build:android`  | Gera um APK/AAB para Android              |
| `expo build:ios`      | Gera um IPA para iOS                      |
| `expo eject`          | Ejetar do Expo para React Native puro     |

---
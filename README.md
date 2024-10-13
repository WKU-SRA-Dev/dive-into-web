# Dive into Web

Hi, wisdom keeper 😘, this is dive into web, through this tutorial you can learn basic html, css, and js. Finally you will have can got your own side project absolutely you can use it as your intro to programming course.
Because we are teaching you the fundamental part of web, so we will not use any library or framework like react, nextjs even the tailwindcss. Be free to modify our code and to see what will happen  
We may not provide video based tutorial cause we believe you can find most good resource on youtube.  

## Getting Started

### How to Running Locally on Mac

1. **Install `npm`**
   
   1. Download Node.js Installer:
   - Go to the [Node.js Downloads page](https://nodejs.org/) and download the macOS .pkg installer.
   2. Run the Installer:
   - Open the downloaded file and follow the installation instructions, agreeing to terms and selecting installation locations as needed.
   3. Verify Installation:
   - Open `Terminal.app` on your mac and run:
     
     ```bash
     node -v
     npm -v
     ```
   
   . This can confirms the both Node.js and npm are installed correctly.

2. **Install `yarn` via `npm`**
   
   1. Installation:
   - Open `Terminal.app` on your mac and run:
     
     ```bash
     npm install --global yarn
     ```
   2. Check Installation:
   - Check that `yarn` is installed by running:
     
     ```bash
     yarn --version
     ```

3. **Running Locally**
   
   1. Fork the project to your own GitHub repositories.
   
   2. Clone the repository to your local repository.
   
   4. `git checkout -b my-code-journey` (You can name the branch as you like)

      4. Use `yarn install` to install all the dependencies.
      
      5. Use `yarn build` to build the server.
      
      6. Use `yarn start` to start the server.
      
      7. Open the links shown in your terminal.

   8. Alternatively, run `yarn hello-world` for the first time; it includes all the scripts you need to run the app.

### 4. **Further Instructions**

When new code is pushed to the repository:

1. **Sync Your Local Repository**:
   - Ensure you're on the branch where you want to incorporate the updates:
     ```bash
     git switch main
     ```
   - Pull the latest changes from the remote repository:
     ```bash
     git pull origin main
     ```
     Replace `main` with the appropriate branch if you can resolve the conflicts

2. **Install New Dependencies**:
   - After pulling the latest changes, you might need to install any new dependencies. Run:
     ```bash
     yarn install
     ```

3. **Rebuild the Project**:
   - If there are updates that require a rebuild, execute:
     ```bash
     yarn build
     ```

4. **Restart the Server**:
   - Finally, restart the server to reflect the latest changes:
     ```bash
     yarn start
     ```

By following these steps, you can ensure that your local copy of the project is up-to-date with the latest changes made in the repository.

 
   

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Here is how you can run the project locally:

1. Clone this repo

    ```sh
    git clone git@github.com:fahmiidris/nextjs-app-dir-template.git
    ```

2. Go into the project root directory

    ```sh
    cd nextjs-app-dir-template
    ```

3. Copy `.env.example` to `.env`

    ```sh
    cp .env.example .env
    ```

4. Install JS dependencies

    ```sh
    pnpm install
    ```

5. Start the dev server

    ```sh
    pnpm run dev
    ```

## How to use this template

Here is how you can use this template to create a new Next.js project:

### Create new project using this template

There are two ways to create a new project using this template:

1. Create a new repository on GitHub

    Click the **Use this template** button in the top right corner, and then click **Create new repository**.

    ![use-this-template](https://github.com/fahmiidris/nextjs-app-dir-template/assets/85909352/13440548-ffd6-4980-a31c-697de59bb0b1)

2. Use [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app)

    ```sh
    pnpx create next-app -e https://github.com/fahmiidris/nextjs-app-dir-template project-name
    ```

### Setup supabase project

1.  Create a new supabase project

    Go to [supabase.com](https://supabase.com/), sign-in, and create a new project.

    > Note: Make sure your project password is very safe, because it will be used as a password database.

2.  Setup environment variables

    Copy `.env.example` to `.env`

    ```sh
    cp .env.example .env
    ```

    Then, fill in the environment variables. I have commented the instructions for getting the value in the `.env` file.

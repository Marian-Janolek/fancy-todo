## Instalation guide

### 1. Run the following command to install the necessary packages:

```bash
npm i
```

### 2. Create a New Database File in the Project Root

For windows users

```bash
New-item dev.db
```

For Linux users

```bash
touch dev.db
```

### 3. Create a **.env** File in the Project Root

For windows users

```bash
New-item .env
```

For Linux users

```bash
touch .env
```

Add the following line to the **.env** file:
**DATABASE_URL="file:./dev.db"**

### 4. Migrate prisma schema

Run the following command to migrate the Prisma schema:

```bash
npx prisma migrate dev --name init
```

### 5.Run seeder script to populate database

Execute the seeder script to populate the database:

```bash
npm run seed
```

### 6. Start the project in development mode with:

```
npm run dev
```

## Optional features

- Reusable modal component
- Edit capability
- Pagination support
- Loading state indicators
- Custom hooks
- Custom toast notifications
- Backend integration
- Database schema

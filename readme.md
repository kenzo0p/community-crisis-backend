COMMUNITY_CRISIS_BACKEND
# Check running containers
docker ps

# Connect using psql (if you have it)
psql -h localhost -U postgres -d myappdb

# Or open Prisma Studio
pnpm prisma studio


docker run --name my-postgres-db   -e POSTGRES_USER=postgres   -e POSTGRES_PASSWORD=mysecretpassword   -e POSTGRES_DB=myappdb   -p 5432:5432   -d postgres:15


docker start my-postgres-db
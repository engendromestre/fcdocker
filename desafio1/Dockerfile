FROM golang:latest as build

WORKDIR /app

COPY . /app

RUN CGO_ENABLED=0 GOOS=linux go build -o result main.go

# Multistage Building
FROM scratch

WORKDIR /app

COPY --from=build /app/result ./

CMD [ "./result" ]
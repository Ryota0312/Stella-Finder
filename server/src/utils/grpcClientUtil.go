package utils

import (
	"context"
	"github.com/golang/protobuf/ptypes/timestamp"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
	"log"
	"stella-finder-server/src/grpcClient/github.com/ryota0312/hoshiyomi/moon"
	"time"
)

func GetMoonInfo(date time.Time, latitude float64, longitude float64) (*moon.MoonInfoResponse, error) {
	const addr = "host.docker.internal:50051"
	conn, err := grpc.Dial(addr, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("Did not connect: %v", err)
		return nil, err
	}
	defer conn.Close()
	gc := moon.NewMoonApiClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := gc.MoonInfo(ctx, &moon.MoonInfoRequest{
		Date: &timestamp.Timestamp{
			Seconds: date.Unix(),
			Nanos:   0,
		},
		Latitude:  35.0,
		Longitude: 135.0,
	})
	if err != nil {
		log.Fatalf("Could not echo: %v", err)
		return nil, err
	}

	return r, nil
}

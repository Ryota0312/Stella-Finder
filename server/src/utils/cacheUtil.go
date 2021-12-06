package utils

import (
	"fmt"
	"github.com/gomodule/redigo/redis"
	"os"
)

type Redis struct {
	connection redis.Conn
}

func NewCacheDb() *Redis {
	const ipPort = "host.docker.internal:6380"

	c, err := redis.Dial("tcp", ipPort)
	if err != nil {
		panic(err)
	}

	r := &Redis{
		connection: c,
	}
	return r
}

func (r *Redis) CloseCacheDb() {
	_ = r.connection.Close()
}

func (r *Redis) Set(key string, payload []byte, ttl int) error {
	if _, err := r.connection.Do("SET", key, payload); err != nil {
		fmt.Println("cache SET : ", err)
		os.Exit(1)
		return err
	}
	if _, err := r.connection.Do("EXPIRE", key, ttl); err != nil {
		fmt.Println("cache EXPIRE() : ", err)
		os.Exit(1)
		return err
	}
	return nil
}

func (r *Redis) Get(key string) ([]byte, error) {
	payload, err := redis.Bytes(r.connection.Do("GET", key))
	if err != nil {
		fmt.Println("cache GET : ", err)
		return payload, err
	}
	return payload, err
}

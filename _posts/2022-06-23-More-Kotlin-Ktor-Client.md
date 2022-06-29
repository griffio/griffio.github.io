---
layout: post
title: "More Kotlin (Ktor Client Json)"
category: programming
tags: kotlin
published: true
summary: kotlin Ktor Client Json
---

A basic example that pulls together a setup for using [ktor http client](https://ktor.io/docs/getting-started-ktor-client.html) with json decoding.

For a more complete example with Serialization and Flow pagination see git repo [ktor-client-json](https://github.com/griffio/ktor-client-json)

For a Ktor application, the Kotlin serialization compiler plugin is added to the build - 
> that generates visitor code for serializable classes, runtime library with core serialization API and support libraries with various serialization formats

See [kotlinx.serialization](https://github.com/Kotlin/kotlinx.serialization/blob/master/README.md#setup)

A typical complete `build.gradle.kts` file depends on ktor core, a client engine and some custom json serialization

``` kotlin

plugins {
    kotlin("jvm") version "1.7.0"
    kotlin("plugin.serialization") version "1.7.0" // compiler plugin
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    implementation("io.ktor:ktor-client-core-jvm:2.0.2")
    implementation("io.ktor:ktor-client-java:2.0.2")
    implementation("io.ktor:ktor-client-content-negotiation:2.0.2")
    implementation("io.ktor:ktor-serialization-kotlinx-json:2.0.2")
    // a version of kotlinx-serialization-json will be pulled in by ktor-serialization-kotlinx-json
    // uncomment below to specify exact version if latest is required
    // implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.3.3")
    testImplementation(kotlin("test"))
}

tasks.test {
    useJUnitPlatform()
}

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(11))
    }
}


```

An example Ktor client making requests to a suitable json producing api - [Star Wars Api](https://swapi.dev/) 

For the `swapi.dev/api/planets` response, be aware that most values in a Planet can also return "unknown" instead of `null` for data that is not quantified

This serves as an example where the response requires modification when decoding and exercises the flexibilty of the serialization library

With Kotlin Serialization, there [doesn't seem](https://github.com/Kotlin/kotlinx.serialization/issues/754) to be an easy way of specifying decoding "unknown" as `null` using the compiler generated Serializer. All the available examples can be seen [here](https://github.com/Kotlin/kotlinx.serialization/tree/master/guide/example)

Planets response

``` json

{
	"count": 60,
	"next": "https://swapi.dev/api/planets/?page=2",
	"previous": null,
	"results": [
		{
			"name": "Tatooine",
			"rotation_period": "23",
			"orbital_period": "304",
			"diameter": "10465",
			"climate": "arid",
			"gravity": "1 standard",
			"terrain": "desert",
			"surface_water": "1",
			"population": "200000",
			"residents": [
				"https://swapi.dev/api/people/1/",
			],
			"films": [
				"https://swapi.dev/api/films/1/",
			],
			"created": "2014-12-09T13:50:49.641000Z",
			"edited": "2014-12-20T20:58:18.411000Z",
			"url": "https://swapi.dev/api/planets/1/"
		},
	
```

* Each response is a list of Planets
  * [ContentNegotiation](https://ktor.io/docs/serialization.html) is a Ktor client plugin used when a server sends a response with `application/json`, the response payload is marshalled into a data class 	
* Planets is a wrapper for the results and pagination
* Kotlin Serialization only supports explicit attribute name to data class property via [@SerialName](https://kotlin.github.io/kotlinx.serialization/kotlinx-serialization-core/kotlinx.serialization/-serial-name/index.html)
  * For/against arguments of using automatic naming strategy [kotlinx.serialization/issues/33](https://github.com/Kotlin/kotlinx.serialization/issues/33)  
* Planet demonstrates a custom [KSerializer](https://kotlin.github.io/kotlinx.serialization/kotlinx-serialization-core/kotlinx.serialization/-k-serializer/index.html) to handle typically variant data fields where "unknown" is returned in the field value
  * The documentation doesn't seem to handle this particular usage where `null` is substituted for a specific value during deserialization
  * In this case - a population value of "unknown" is considered nullable Long  
  * Serializers can be installed at the top level instead of property annotations e.g `@file:UseSerializers(UnknownToNullableSerializer::class)`

First approach with KSerializer for each nullable type, can be configured as `@file:UseSerializers(UnknownToNullableSerializer,...)`

``` kotlin

package griffio.client

import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.java.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.KSerializer
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.descriptors.PrimitiveKind
import kotlinx.serialization.descriptors.PrimitiveSerialDescriptor
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder
import kotlinx.serialization.json.Json

@Serializable
data class Planets(
    val results: List<Planet>
)

@Serializable
data class Planet(
    val climate: String,
    val diameter: Int,
    val gravity: String,
    val name: String,
    // FYI https://github.com/Kotlin/kotlinx.serialization/issues/33
    @SerialName("orbital_period")
    val orbitalPeriod: Int,
    @Serializable(with = UnknownToNullableSerializer::class)
    val population: Long?
)
// This KSerializer would have to be duplicated for every "unknown" type (String?, Int?)
// See repo for example
class UnknownToNullableSerializer : KSerializer<Long?> {
    override val descriptor: SerialDescriptor =
        PrimitiveSerialDescriptor("population.Long?", PrimitiveKind.STRING)
    override fun serialize(encoder: Encoder, value: Long?): Unit =
        encoder.encodeString(value.toString())
    override fun deserialize(decoder: Decoder): Long? {
        val decoded = decoder.decodeString()
        return if (decoded.startsWith("unknown")) null else decoded.toLong()
    }
}

suspend fun main() {
    // Setup HttpClient - e.g use Java engine
    // io.ktor:ktor-client-java
    // io.ktor:ktor-client-content-negotiation
    // io.ktor:ktor-serialization-kotlinx-json
    val client = HttpClient(Java) {
        install(ContentNegotiation) {
            json(Json {
                prettyPrint = true
                isLenient = true
                ignoreUnknownKeys = true
            })
        }
    }

    val resource = "https://swapi.dev/api/planets"

    val response: HttpResponse = client.request(resource)

    val planets: Planets = response.body()

    println(planets)
    // see more complete version https://github.com/griffio/ktor-client-json
}


```

Second approach with [JsonTransformingSerializer](https://github.com/Kotlin/kotlinx.serialization/blob/master/docs/json.md#json-transformations) for the Planet type 

Repo branch example [github.com/griffio/ktor-client-json/tree/JsonTransformingSerializer](https://github.com/griffio/ktor-client-json/tree/JsonTransformingSerializer)

All json values containing "unknown" will be set to `null` and Planet properties are set to nullable types

`@file:UseSerializers` is used at the top of the file because the plugin generated Planet.serializer needs to be invoked on the transformed element

``` kotlin

@file:UseSerializers(UnknownToNullPlanetSerializer::class)

package griffio.client

import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.engine.java.*
import io.ktor.client.plugins.contentnegotiation.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.serialization.kotlinx.json.*
import kotlinx.serialization.KSerializer
import kotlinx.serialization.SerialName
import kotlinx.serialization.Serializable
import kotlinx.serialization.descriptors.PrimitiveKind
import kotlinx.serialization.descriptors.PrimitiveSerialDescriptor
import kotlinx.serialization.descriptors.SerialDescriptor
import kotlinx.serialization.encoding.Decoder
import kotlinx.serialization.encoding.Encoder
import kotlinx.serialization.json.Json

@Serializable
data class Planets(
    val results: List<Planet>
)

@Serializable // Keep the default Serializer available for the transformer
data class Planet(
    val climate: String?,
    val diameter: Int?,
    val gravity: String?,
    val name: String?,
    @SerialName("orbital_period")
    val orbitalPeriod: Int?,
    val population: Long?
)

// Planet.serializer() will decode the transformed JsonObject into a Planet
class UnknownToNullPlanetSerializer : JsonTransformingSerializer<Planet>(Planet.serializer()) {
    override fun transformDeserialize(element: JsonElement): JsonElement {
        val unknown = JsonPrimitive("unknown")
        val newMap = element.jsonObject.mapValues { entry ->
            if (entry.value == unknown) {
                JsonNull
            } else entry.value
        }
        return JsonObject(newMap)
    }
}

suspend fun main() {
    // Setup HttpClient - e.g use Java engine
    // io.ktor:ktor-client-java
    // io.ktor:ktor-client-content-negotiation
    // io.ktor:ktor-serialization-kotlinx-json
    val client = HttpClient(Java) {
        install(ContentNegotiation) {
            json(Json {
                prettyPrint = true
                isLenient = true
                ignoreUnknownKeys = true
            })
        }
    }

    val resource = "https://swapi.dev/api/planets"

    val response: HttpResponse = client.request(resource)

    val planets: Planets = response.body()

    println(planets)
    // see more complete version https://github.com/griffio/ktor-client-json/blob/JsonTransformingSerializer
}
```

---
layout: post
title: "More Kotlin (Ktor Client Json)"
category: programming
tags: kotlin
published: true
summary: kotlin Ktor Client Json
---

A basic example of the setup for using [Ktor http client](https://ktor.io/docs/getting-started-ktor-client.html) with Json decoding.

There is a somewhat elaborate configuration to pull it all together as Kotlin serialization uses a compiler plugin - "that generates visitor code for serializable classes, runtime library with core serialization API and support libraries with various serialization formats." see (https://github.com/Kotlin/kotlinx.serialization/blob/master/README.md#setup)

A typical complete `build.gradle.kts` file depends on ktor core, a client engine and json serialization

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

Example Ktor client making requests to a suitable json producing api - [swapi.dev](https://swapi.dev/) 

* Each response is a list of Planets
* Planets is a wrapper for the results 
* Kotlin Serialization only supports explicit field name translation to data class property via @SerialName
  * For/against arguments for automatic translation (https://github.com/Kotlin/kotlinx.serialization/issues/33)  
* Planet demonstrates a customer serializer to handle typically variant data fields
  * In this case - a population value of "unknown" is considered nullable  

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
    @Serializable(with = PopulationNullableSerializer::class)
    val population: Long?
)

class PopulationNullableSerializer : KSerializer<Long?> {
    override val descriptor: SerialDescriptor = PrimitiveSerialDescriptor("population.Long?", PrimitiveKind.STRING)
    override fun serialize(encoder: Encoder, value: Long?): Unit = encoder.encodeString(value.toString())
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
}


```

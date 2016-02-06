Much Clojure code relies on applying nested transformations to sequences:

~~~
(reduce + 0 (filter odd? (map inc (range 1000))))
~~~

Transducers let you represent the transformation parts as an independent (reusable) thing:

~~~
(def xf (comp (map inc) (filter odd?)))
~~~

You then apply that composite transformation in a single pass over the input:

~~~
(transduce xf + 0 (range 1000))
~~~

Once you seen that transduction with a vector is nearly as fast as a for loop over a mutable array

into takes transducers and generalizes those

~~~
(into {} (map (juxt :id certificate-name) certificates))
~~~

spy macro

~~~
(defmacro spy [x]
  `(let [x# ~x]
     (println "<=" '~x "=>")
     (println x#)
     x#))
~~~

~~~
(macroexpand '(.getElementById js/document "container"))
(. js/document getElementById "container")
~~~

~~~
(defn cubed [x]
  (* x x x))

(defn bp
  ([box] (bp 0 box))
  ([volume box]
    (if box
       (recur (+ volume (cubed (:a box))) (:inner-box box))
       volume)))
~~~

~~~
(require 'om.next.tests) (in-ns 'om.next.tests) (run-tests)
~~~

~~~
(defn map->csv-map
  ([map] (map->csv-map "" map))
  ([prefix map]
   (reduce-kv (fn [m k v]
                (let [prefixed (if (empty? prefix)
                                 k
                                 (str prefix "_" k))]
                  (merge m (if (map? v)
                             (map->csv-map prefixed v)
                             {prefixed v}))))
              {}
              map)))
~~~

~~~
(js/goog.object.get obj "stuff")
~~~

~~~
(defn digits [number]
  (if (> number 10)
    (conj (digits (quot number 10)) (mod number 10))
    [number]))
~~~

~~~
(defn range' [start end step] (take-while #(< % end) (iterate #(+ % step) start)))
~~~

~~~
(defn f [v]
  (if (some coll? v)
    (into [] (mapcat #((if (coll? %) f vector) %)) v)
    [v]))
~~~

~~~
(for [[id [val & _]] (group-by :age [{:name "moe" :age 40} {:name "larry" :age 50} {:name "curly" :age 60}])]
      (println "id=" id "; val=" val))
~~~

~~~
(map (fn [i f b] (if (or f b) (str f b) i))
  (range 1 101)
  (cycle [nil nil "FIZZ"])
  (cycle [nil nil nil nil "BUZZ"]))

(let [c constantly s str f (c "Fizz") b (c "Buzz") fb (c "FizzBuzz")] (map #(% %2) (cycle [s s f s b f s s f b s f s s fb]) (range 1 100)))

(map #(or (not-empty %1) %2)
   (map str
      (cycle (conj (repeat 2 nil) "fizz"))
      (cycle (conj (repeat 4 nil) "buzz")))
   (range))
~~~

~~~
[[x1 y1 :as c1] [x2 y2 :as c2] :as cs]

((fn [[[x1 y1] [x2 y2] :as [c1 c2 :as cs]]] {:x1 x1 :y1 y1 :x2 x2 :y2 y2 :c1 c1 :c2 c2 :cs cs}) [[1 2] [3 4]])

~~~

~~~
 (defn average [numbers]
  (when (seq numbers)
    (/ (apply + numbers) (count numbers))))
~~~

~~~
(identical? (type x) js/Object)
~~~

~~~
cljs.core/ex-info
~~~

~~~
(defn g [v]
  (let [branch? #(and (coll? %) (some coll? %))]
    (->> (tree-seq branch? identity v)
         (into [] (remove branch?)))))
~~~

~~~
(gevents/listen js/window EventType.MOUSEDOWN
  (fn [e] ...))
~~~

~~~
(defn factorial [n]
    (loop [cnt n
           acc 1]
      (if (< cnt 2) acc
        (recur (dec cnt) (* cnt acc)))))

(factorial 5)
~~~

~~~
(doto 'my.application require in-ns)
~~~

~~~
(a/go-loop [timeout (initial-timeout)]
  (let [[v ch] (a/alts! [timeout other-ch stop-ch])]
    (condp = ch
      timeout  (recur (handle-timeout))
      other-ch (recur (handle-other-ch v))
      stop-ch  (handle-stop))))
~~~

:import is for one thing and one thing only importing classes that are also namespaces that’s all that it is for

---

OM Next

root components must have the entire query
this computes the fetched data tree
your components are assigned to take different parts of that tree (by having returned queries themselves)(edited)
the parent must respect the associations it made in its own query(edited)
otherwise it’s just busted and isn’t handing children the props they asked for


the way :pathopt true actually works is the following

parse gets invoked once with an ident

if this returns nil, it will get invoked again with a root query so this means you can supply a parse that wraps the real parse that checks if the ident is something you actually want to handle

the AST is just to avoid needing to traverse maps, lists, vector, etc.
Trying to use the surface syntax to get to something is a nightmare
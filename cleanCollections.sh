#!/bin/bash

colls=(units topics courses users resources)
for coll in ${colls[@]} # gets all items in the array and applies to it like a normal loop
do
  echo $coll
    mongo sparked-test --eval "db.$coll.remove({})"
done
#!/bin/bash

filterQuery=$1
indexDir=/data/indexes

function printRed() {
    printf "\e[0;31m$1\e[0;31m\n"
}

function deleteIndexes() {
    java -cp "/jars/blacklab/WEB-INF/lib/*" nl.inl.blacklab.tools.IndexTool delete $1 $2 --index-type integrated
}

deleteIndexes $indexDir $filterQuery

if [ $? -ne 0 ]; then 
    printRed "Error: Failed to delete indexes in $1 with filter $2"
    exit 1
fi

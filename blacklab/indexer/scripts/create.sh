#!/bin/bash

indexDir=/data/indexes
inputFiles=/data/indexer/data

function printGreen() {
    printf "\e[0;32m$1\e[0;m\n"
}

function printYellow() {
    printf "\e[0;33m$1\e[0;33m\n"
}

function generateIndex() {
    java -cp "/jars/blacklab/WEB-INF/lib/*" nl.inl.blacklab.tools.IndexTool $1 $2 $3 /data/indexer/formats/custom.blf.json 
}


if ! [ "$(ls -A $inputFiles)" ]; then
    printYellow 'There is no index to parse!'
    exit 0
fi

# if blacklab-indexes folder has indexes, use `add` command
if [ "$(ls -A $indexDir)" ]; then
    generateIndex "add" $indexDir $inputFiles
    printGreen "Blacklab indexes added at ${indexDir}"
else
    # if blacklab-indexes folder is empty, use `create` command
    generateIndex "create" $indexDir $inputFiles
    printGreen "Blacklab indexes created at ${indexDir}"
fi

# after indexing, remove the tei data
rm -rf $inputFiles/*.xml

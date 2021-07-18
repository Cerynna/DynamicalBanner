#!/bin/bash
backend="$(pwd)/backend";
frontend="$(pwd)/frontend";
#Init des node_modules
cd $frontend && yarn;
    cd $backend && yarn;

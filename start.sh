#!/bin/sh

WORKDIR=`pwd`

cd ${WORKDIR}/blog-backend/
npm test &

cd ${WORKDIR}/blog-frontend/
npm start &
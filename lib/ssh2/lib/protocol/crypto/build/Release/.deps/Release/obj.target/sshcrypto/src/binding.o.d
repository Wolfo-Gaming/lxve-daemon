cmd_Release/obj.target/sshcrypto/src/binding.o := g++ -o Release/obj.target/sshcrypto/src/binding.o ../src/binding.cc '-DNODE_GYP_MODULE_NAME=sshcrypto' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-DV8_DEPRECATION_WARNINGS' '-DV8_IMMINENT_DEPRECATION_WARNINGS' '-D_GLIBCXX_USE_CXX11_ABI=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-D__STDC_FORMAT_MACROS' '-DOPENSSL_NO_PINSHARED' '-DOPENSSL_THREADS' '-DOPENSSL_API_COMPAT=0x10100000L' '-DBUILDING_NODE_EXTENSION' -I/home/robert/.cache/node-gyp/17.4.0/include/node -I/home/robert/.cache/node-gyp/17.4.0/src -I/home/robert/.cache/node-gyp/17.4.0/deps/openssl/config -I/home/robert/.cache/node-gyp/17.4.0/deps/openssl/openssl/include -I/home/robert/.cache/node-gyp/17.4.0/deps/uv/include -I/home/robert/.cache/node-gyp/17.4.0/deps/zlib -I/home/robert/.cache/node-gyp/17.4.0/deps/v8/include -I../../../../../nan  -fPIC -pthread -Wall -Wextra -Wno-unused-parameter -m64 -O3 -O3 -fno-omit-frame-pointer -fno-rtti -fno-exceptions -std=gnu++17 -MMD -MF ./Release/.deps/Release/obj.target/sshcrypto/src/binding.o.d.raw   -c
Release/obj.target/sshcrypto/src/binding.o: ../src/binding.cc \
 /home/robert/.cache/node-gyp/17.4.0/include/node/node.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/cppgc/common.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8config.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-array-buffer.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-local-handle.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-internal.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-version.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8config.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-object.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-maybe.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-persistent-handle.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-weak-callback-info.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-primitive.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-data.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-value.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-traced-handle.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-container.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-context.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-snapshot.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-date.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-debug.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-exception.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-extension.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-external.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-function.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-function-callback.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-message.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-template.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-memory-span.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-initialization.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-isolate.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-callbacks.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-embedder-heap.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-microtask.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-statistics.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-promise.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-unwinder.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-platform.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-json.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-locker.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-microtask-queue.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-primitive-object.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-proxy.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-regexp.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-script.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-typed-array.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-value-serializer.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/v8-wasm.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/node_version.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/node_buffer.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/node.h \
 ../../../../../nan/nan.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/node_version.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/uv.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/uv/errno.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/uv/version.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/uv/unix.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/uv/threadpool.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/uv/linux.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/node_object_wrap.h \
 ../../../../../nan/nan_callbacks.h \
 ../../../../../nan/nan_callbacks_12_inl.h \
 ../../../../../nan/nan_maybe_43_inl.h \
 ../../../../../nan/nan_converters.h \
 ../../../../../nan/nan_converters_43_inl.h ../../../../../nan/nan_new.h \
 ../../../../../nan/nan_implementation_12_inl.h \
 ../../../../../nan/nan_persistent_12_inl.h ../../../../../nan/nan_weak.h \
 ../../../../../nan/nan_object_wrap.h ../../../../../nan/nan_private.h \
 ../../../../../nan/nan_typedarray_contents.h \
 ../../../../../nan/nan_json.h ../../../../../nan/nan_scriptorigin.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/configuration.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/./configuration_asm.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/configuration.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/err.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/./err_asm.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/err.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/macros.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/opensslconf.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/./opensslconf_asm.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/opensslconf.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/opensslv.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/./opensslv_asm.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/opensslv.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/e_os2.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/types.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/safestack.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/./safestack_asm.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/safestack.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/stack.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/bio.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/./bio_asm.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/bio.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/crypto.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/./crypto_asm.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/crypto.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/cryptoerr.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/symhacks.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/cryptoerr_legacy.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/core.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/bioerr.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/lhash.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/./lhash_asm.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/lhash.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/evp.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/core_dispatch.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/evperr.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/params.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/bn.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/bnerr.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/objects.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/obj_mac.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/asn1.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/./asn1_asm.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/asn1.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/asn1err.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/objectserr.h \
 /home/robert/.cache/node-gyp/17.4.0/include/node/openssl/hmac.h
../src/binding.cc:
/home/robert/.cache/node-gyp/17.4.0/include/node/node.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/cppgc/common.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8config.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-array-buffer.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-local-handle.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-internal.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-version.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8config.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-object.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-maybe.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-persistent-handle.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-weak-callback-info.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-primitive.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-data.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-value.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-traced-handle.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-container.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-context.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-snapshot.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-date.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-debug.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-exception.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-extension.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-external.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-function.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-function-callback.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-message.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-template.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-memory-span.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-initialization.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-isolate.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-callbacks.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-embedder-heap.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-microtask.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-statistics.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-promise.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-unwinder.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-platform.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-json.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-locker.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-microtask-queue.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-primitive-object.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-proxy.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-regexp.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-script.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-typed-array.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-value-serializer.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/v8-wasm.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/node_version.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/node_buffer.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/node.h:
../../../../../nan/nan.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/node_version.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/uv.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/uv/errno.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/uv/version.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/uv/unix.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/uv/threadpool.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/uv/linux.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/node_object_wrap.h:
../../../../../nan/nan_callbacks.h:
../../../../../nan/nan_callbacks_12_inl.h:
../../../../../nan/nan_maybe_43_inl.h:
../../../../../nan/nan_converters.h:
../../../../../nan/nan_converters_43_inl.h:
../../../../../nan/nan_new.h:
../../../../../nan/nan_implementation_12_inl.h:
../../../../../nan/nan_persistent_12_inl.h:
../../../../../nan/nan_weak.h:
../../../../../nan/nan_object_wrap.h:
../../../../../nan/nan_private.h:
../../../../../nan/nan_typedarray_contents.h:
../../../../../nan/nan_json.h:
../../../../../nan/nan_scriptorigin.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/configuration.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/./configuration_asm.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/configuration.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/err.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/./err_asm.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/err.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/macros.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/opensslconf.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/./opensslconf_asm.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/opensslconf.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/opensslv.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/./opensslv_asm.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/opensslv.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/e_os2.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/types.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/safestack.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/./safestack_asm.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/safestack.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/stack.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/bio.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/./bio_asm.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/bio.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/crypto.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/./crypto_asm.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/crypto.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/cryptoerr.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/symhacks.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/cryptoerr_legacy.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/core.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/bioerr.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/lhash.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/./lhash_asm.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/lhash.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/evp.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/core_dispatch.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/evperr.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/params.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/bn.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/bnerr.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/objects.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/obj_mac.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/asn1.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/./asn1_asm.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/././archs/linux-x86_64/asm/include/openssl/asn1.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/asn1err.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/objectserr.h:
/home/robert/.cache/node-gyp/17.4.0/include/node/openssl/hmac.h:

/** Dependencies */
import { getFFmpegBinaryPath } from '@moon/ffmpeg';
import { getFFprobeBinaryPath } from '@moon/ffprobe';
import { getFlareSolverrBinaryPath } from '@moon/flaresolverr';
import { context } from '@moon/context';
import { config, encryptedConfig } from '@moon/config';
import { TMDB } from 'packages/integrations/tmdb/dist';

context.on('binaries:download:start', ({ version, name }) => {
  console.log(`Downloading ${name} v${version}...`);
})

context.on('binaries:download:progress', ({ name, progress, version }) => {
  console.log(`Downloading ${name} v${version}: ${progress}% complete`);
});

context.on('binaries:download:complete', ({ name, version }) => {
  console.log(`Downloaded ${name} v${version} successfully.`);
});

context.on('binaries:extract:start', ({ name, version }) => {
  console.log(`Extracting ${name} v${version}...`);
});

context.on('binaries:extract:complete', ({ name, version }) => {
  console.log(`Extracted ${name} v${version} successfully.`);
});

/**
 * @brief Bootstrap the application
 * @description Initializes the application by retrieving the paths to the required binaries.
 */
async function bootstrap() {
  const ffmpegPath = await getFFmpegBinaryPath();
  const ffprobePath = await getFFprobeBinaryPath();
  const flaresolverrPath = await getFlareSolverrBinaryPath();

  console.log('FFmpeg Path:', ffmpegPath);
  console.log('FFprobe Path:', ffprobePath);
  console.log('FlareSolverr Path:', flaresolverrPath);

  console.log('Config:', config);
  console.log('Encrypted Config:', encryptedConfig.getAll());

  const tmdb = new TMDB(encryptedConfig.get('tmdb'));

  const movie = await tmdb.searchMovie({ query: 'Inception', year: 2010 });
  console.log(movie);

  if (movie.total_results > 0) {
    await tmdb.downloadPoster(movie.results[0].poster_path, 'w500', './downloads/posters/inception.jpg');
  }
}

bootstrap();

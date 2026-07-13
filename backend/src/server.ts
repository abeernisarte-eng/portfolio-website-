import app from './app';

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`=============================================`);
    console.log(`🚀 API Server running on: http://localhost:${PORT}`);
    console.log(`📁 Uploads serving from:  http://localhost:${PORT}/uploads`);
    console.log(`=============================================`);
  });
}

export default app;

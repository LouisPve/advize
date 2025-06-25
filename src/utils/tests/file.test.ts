import fs from 'fs';
import { _isDirectoryExists, _createDirectory } from '../file';

jest.mock('fs');

describe('_isDirectoryExists', () => {
    it('should return true if the directory exists', () => {
        (fs.existsSync as jest.Mock).mockReturnValue(true);
        expect(_isDirectoryExists('/some/path')).toBe(true);
    });

    it('should return false if the directory does not exist', () => {
        (fs.existsSync as jest.Mock).mockReturnValue(false);
        expect(_isDirectoryExists('/some/path')).toBe(false);
    });
});

describe('_createDirectory', () => {
    it('should create a directory if it does not exist', () => {
        (fs.existsSync as jest.Mock).mockReturnValue(false);
        const mkdirSyncMock = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
            return '';
        });

        _createDirectory('/some/path');

        expect(mkdirSyncMock).toHaveBeenCalledWith('/some/path');
        mkdirSyncMock.mockRestore();
    });

    it('should not create a directory if it already exists', () => {
        (fs.existsSync as jest.Mock).mockReturnValue(true);
        const mkdirSyncMock = jest.spyOn(fs, 'mkdirSync').mockImplementation(() => {
            return '';
        });

        _createDirectory('/some/path');

        expect(mkdirSyncMock).not.toHaveBeenCalled();
        mkdirSyncMock.mockRestore();
    });
});
